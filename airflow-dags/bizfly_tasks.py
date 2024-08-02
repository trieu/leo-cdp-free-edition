import requests
import json
from datetime import datetime
import sys
import os
import traceback
import logging
import bizfly_api
from pytz import timezone
import re
from redis_connection import connect_to_redis
from pipeline_config import DAG_TEMP_DATA_FOLDER

file_path = DAG_TEMP_DATA_FOLDER
EXPIRED_TIME = 15

def ensure_folder_exists(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f"Folder created: {folder_path}")
    else:
        print(f"Folder already exists: {folder_path}")
        
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


file_loader = f"{file_path}file_loader"
ensure_folder_exists(file_loader)

file_processor = f"{file_path}file_processer"
ensure_folder_exists(file_processor)

# Configure Redis connection

timestamp = datetime.now(timezone('Asia/Ho_Chi_Minh')).strftime("%Y%m%d_%H%M%S")
# Create a Redis client
redis_db = connect_to_redis()
logger = logging.getLogger('cdp_bizfly_email_synch')

def get_cdp_url(cdp_hostname):
    if len(cdp_hostname) == 0:
        cdp_hostname = 'dcdp.bigdatavietnam.org'
    else:
        cdp_hostname = cdp_hostname
    return "https://" + cdp_hostname + "/api/segment/profiles?"

def convert_to_bizfly_time(date):
    try:
        return datetime.strptime(date, "%b %d, %Y, %I:%M:%S %p").strftime("%d/%m/%Y")
    except:
        return datetime.strptime(date, "%b %d, %y, %I:%M:%S %p").strftime("%d/%m/%Y")


def cdp_profile(json_detail):

    segments = []
    lastest_purchased_date = None
    birthday=None
    totalTransactionvalue = 0
    #name
    if json_detail.get('firstName', '') != json_detail.get('lastName', '') and json_detail.get('firstName', '') != json_detail.get('middleName', ''):
        name = (json_detail.get('firstName', '') +" "+ json_detail.get('middleName', '') +" "+ json_detail.get('lastName', '')).replace('  ', ' ')
    else:
        name = json_detail.get('firstName', '') or json_detail.get('lastName', '') or json_detail.get('middleName', '')
    
    #address
    address = json_detail.get('livingLocation', '') or json_detail.get('livingCity', '')
    
    #emails
    
    #lastest_purchased_date
    purchasedItems = json_detail.get('purchasedItems', '')
    if purchasedItems:
        lastest_purchased_date = convert_to_bizfly_time(purchasedItems[-1]['createdAt'])

    #totalTransactionValue    
    purchasedItems = json_detail.get('purchasedItems', '')
    if  purchasedItems:
        for item in purchasedItems:
            totalTransactionvalue += item.get('salePrice', 0)
    
    #segment
    if json_detail['inSegments']:
        for segment in json_detail['inSegments']:
            if segment:
                segments.append(segment.get('name', ''))
    else:
        segments=""
    
    #birthday
    dateOfBirth = json_detail.get('dateOfBirth', '')
    if dateOfBirth:
        birthday = convert_to_bizfly_time(dateOfBirth)
    
    #gender
    gender = json_detail.get('gender', '')
    if gender == 1:
        gender = 'male'
    elif gender == 0:
        gender = 'female'
    elif gender == 7:
        gender = ''

    #cdp_dataLabels
    cdp_dataLabels = json_detail.get('dataLabels', '')
    
    return name, address, segments,lastest_purchased_date,birthday,totalTransactionvalue,gender,cdp_dataLabels


class cdp_to_bizfly():
    def profile_data_loader_service(segment_package):
        tokenkey = segment_package['tokenkey']
        tokenvalue = segment_package['tokenvalue']
        segmentid = segment_package['segmentid']
        cdp_hostname = segment_package['cdp_hostname']
        profiles = []
        unique_file = f"{segmentid}_{timestamp}"
        count = 0
        with open(f"{file_loader}/{unique_file}.txt", "w+", encoding="utf-8") as file_out, open(f"{file_loader}/{unique_file}.txt", "r+", encoding="utf-8") as file:
            while True:
                current_pos = 0
                buf = 0
                max_retries = 100
                for retries in range(max_retries):
                    try:
                        api_url = get_cdp_url(cdp_hostname)
                        print(api_url)

                        headers = {
                            "tokenkey": tokenkey,
                            "tokenvalue": tokenvalue
                        }
                        params = {
                            "start": current_pos,
                            "length": 2000,
                            "segmentId": segmentid,
                        }
                        response = requests.get(
                            url=api_url, headers=headers, params=params, verify=False)
                        response = response.json()
                        print(response)
                        if response['data'] and isinstance(response['data'], list):
                            for res in response['data']:
                                if res not in profiles:
                                    profiles.append(res)
                                    json.dump(res, file)
                                    count+=1
                                    print(count)
                                    file.write('\n')
                                    buf = 1
                                else:
                                    raise ValueError('Error: Duplicate entry')
                            current_pos += 2000      
                        else:
                            break
                    except ValueError as e:
                        break
                    except:
                        max_retries -= 1
                        traceback.print_exc()
                        print("max_retries",{max_retries})
                if buf == 0:
                    break
            print('--------------')
            print('Total profiles:', count)
            print('--------------')
            return unique_file

    def contact_validation_service(unique_file):
        with open(f"{file_loader}/{unique_file}.txt", "r+", encoding="utf-8") as file, open(f"{file_processor}/{unique_file}.txt", "w+", encoding="utf-8") as file_formatted, open(f"{file_processor}/{unique_file}.txt", "r+", encoding="utf-8") as file_formatted:
            count=0
            for line in file:
                json_detail = json.loads(line)

                emails = json_detail.get('primaryEmail', '') or json_detail.get('secondaryEmails', '') 

                if emails and re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', emails):
                    name, address, segments,lastest_purchased_date,birthday,totalTransactionvalue,gender,cdp_dataLabels = cdp_profile(json_detail)
                    json_profiles = {
                        "redis_key": "prf-" + json_detail['id'],
                        "name": name.replace(',', '/'),
                        "emails": emails,
                        "address": address,
                        "segments": segments,
                        "lastest_purchased_date": lastest_purchased_date,
                        "birthday": birthday,
                        "totalTransactionvalue": totalTransactionvalue,
                        "gender": gender,
                        "cdp_dataLabels": cdp_dataLabels
                    }
                    json.dump(json_profiles, file_formatted)
                    file_formatted.write('\n')
                    count+=1
                    print(f'{count}:{json_profiles}')
            return unique_file



    def process_contact_to_bizfly(unique_file, context):
        with open(f"{file_processor}/{unique_file}.txt", "r+") as file_formatted:
            count=0
            for line in file_formatted:
                detail = json.loads(line)
                redis_key = detail['redis_key']
                if redis_db.exists(redis_key):
                    ttl = redis_db.ttl(redis_key)
                    print(f"mail1: '{detail['emails']}' is expiring in {ttl} seconds.")
                else:
                    redis_db.setex(redis_key, EXPIRED_TIME, json.dumps(detail))
                    payload = bizfly_api.build_bizfly_payload(source='airflow', detail=detail, context=context)
                    count+=1
                    # TODO
                    rs = bizfly_api.send_contact_to_bizfly(count,payload)
            print('--------------')
            print(f'Total profiles is sent successfully:{count}')
            print('--------------')   
