import requests, os, redis

from redis_connection  import connect_to_redis
from dotenv import load_dotenv
load_dotenv(override=True)


CLIENT_CODE = 'dgv'
BIZFLY_BASE_URL_CONTACT = "https://apicampaign.bizfly.vn/api/customer/contact/import"

class BizflyConfig:
    def __init__(self, source=None,context=None):
        if source == 'env':
            self.bizfly_app_key = os.environ['bizfly_app_key']
            self.bizfly_token = os.environ['bizfly_token']
            self.bizfly_project_token = os.environ['bizfly_project_token']
        elif source == 'redis':
            r = connect_to_redis()
            self.bizfly_app_key = r.get(CLIENT_CODE + '_bizfly_app_key').decode('utf-8')
            self.bizfly_token = r.get(CLIENT_CODE +'_bizfly_token').decode('utf-8')
            self.bizfly_project_token = r.get(CLIENT_CODE +'_bizfly_project_token').decode('utf-8')
        
        elif source == 'airflow':
            # context
            self.bizfly_app_key = context['bizfly_app_key']
            self.bizfly_token = context['bizfly_token']
            self.bizfly_project_token = context['bizfly_project_token']
            self.bizfly_list= context.get('bizfly_list','')
        else:
            raise ValueError("Source must be 'env' or 'redis'")
    def __repr__(self):
        return (f"BizflyConfig(bizfly_app_key={self.bizfly_app_key}, "
                f"bizfly_token={self.bizfly_token}, "
                f"bizfly_project_token={self.bizfly_project_token})")
    
def build_bizfly_payload(source, detail, context):
    config = BizflyConfig(source=source,context=context)
    bizfly_app_key = config.bizfly_app_key
    bizfly_token = config.bizfly_token
    bizfly_project_token = config.bizfly_project_token
    bizfly_list = config.bizfly_list
    print(config)
    print(bizfly_app_key)
    print(bizfly_token)
    print(bizfly_project_token)
    print(bizfly_list)
        
    dataLabels = str(", ".join(detail['cdp_dataLabels']))
   
    payload = {
        'app_key': bizfly_app_key,
        'token': bizfly_token,
        'project_token': bizfly_project_token,
        'list': bizfly_list,
        'emails':detail['emails'],
        'phones':'',
        'name': detail['name'],
        'gender': detail['gender'],
        "address": detail['address'],
        "birthday":detail['birthday'],
        "tongMuaHang": detail['totalTransactionvalue'],
        "cdp_dataLabels": dataLabels,
        "dataLabels": detail['cdp_dataLabels'],
        "segments": detail['segments'],
        "lastest_purchased_date": detail['lastest_purchased_date']
    }
    
    return payload


def send_contact_to_bizfly(count,payload):
    if payload is None:
        print("Error: payload is None. Please call build_bizfly_payload to build valid payload")
        return
    # Set headers (optional, add if needed)
    headers = {'Content-Type': 'application/json'}  
    # Send the POST request with JSON payload
    response = requests.post(BIZFLY_BASE_URL_CONTACT, json=payload, headers=headers)
    print(count,"payload",payload)
    # Check for successful response
    if response.status_code == 200:
        # Get the response data
        data = response.json()
        print(data)
        return True
    else:
        # Handle error
        print(f"Error: {response.status_code}")
        print(response.text)
        return False

#payload = build_bizfly_payload('trieu@leocdp.com',"Trieu","Ho Chi Minh City")
#send_contact_to_bizfly(payload)