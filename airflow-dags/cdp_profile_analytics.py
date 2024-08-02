import time
from datetime import datetime, date, time, timedelta

import pendulum
import logging
import redis
from airflow import DAG
from airflow.operators.empty import EmptyOperator
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator

logger = logging.getLogger('cdp_profile_analytics')

# Establish connection to Redis
def connect_to_redis():
    r = redis.Redis(
        host='localhost',
        port=6480
    )
    return r

def load_profiles(**kwargs):
    # TODO 
    conf = kwargs['dag_run'].conf
    segment_id = conf.get('segment_id')    
    service_params = conf.get('service_params')    
    logger.info('load_profiles')
    logger.info('segment_id ' + segment_id)
    
    for key, value in service_params.items():
        logger.info('service_param ' + key + ' ' + value)

def classify_profile_service(**kwargs):
    # TODO 
    logger.info('classify_profile_service')

def scoring_profile_service(**kwargs):
    # TODO 
    logger.info('scoring_profile_service')
        
def save_profile_service(**kwargs):
    dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    r = connect_to_redis()
    r.set('hello_world_done_at', dt_string)
    logger.info('save_profile_service')

with DAG(
    dag_id='cdp_profile_analytics',
    schedule="0 0 * * *",
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    catchup=False,
    dagrun_timeout=timedelta(minutes=60),
    tags=["CDP Profile Enrichment"],
    params={"fb_user_id": ""},
) as dag:
    
    load_profiles = PythonOperator(task_id='load_profiles', python_callable=load_profiles, provide_context=True)

    classify_profile = PythonOperator(task_id='classify_profile', python_callable=classify_profile_service, provide_context=True)

    scoring_profile = PythonOperator(task_id='scoring_profile', python_callable=scoring_profile_service, provide_context=True)
    
    save_profile_task = PythonOperator(task_id='save_profile',  python_callable=save_profile_service, provide_context=True )

load_profiles >> classify_profile >> scoring_profile >> save_profile_task


if __name__ == "__main__":
    dag.test()
