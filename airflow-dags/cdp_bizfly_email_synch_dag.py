import time
from datetime import timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator

import pendulum
import logging

from bizfly_tasks import cdp_to_bizfly
local_tz = pendulum.timezone("Asia/Ho_Chi_Minh")

logger = logging.getLogger('cdp_bizfly_email_synch')


def profile_data_loader_service(**kwargs):
    segment_package = kwargs['dag_run'].conf 
    unique_file = cdp_to_bizfly.profile_data_loader_service(segment_package)
    logger.info('profile_data_loader_service')
    return unique_file

def contact_validation_service(**kwargs):
    ti = kwargs['ti']  # Task Instance
    unique_file = ti.xcom_pull(task_ids='profile_data_loader') 
    processed_unique_file=cdp_to_bizfly.contact_validation_service(unique_file)
    logger.info('contact_validation_service')
    return processed_unique_file


def process_send_contact_to_bizfly(**kwargs):
    ti = kwargs['ti']  # Task Instance
    context = kwargs['dag_run'].conf 
    unique_file = ti.xcom_pull(task_ids='contact_validation') 
    cdp_to_bizfly.process_contact_to_bizfly(unique_file, context)


with DAG(
    dag_id='cdp_bizfly_email_synch',
    schedule_interval=None,
    start_date=pendulum.datetime(2021, 1, 1, tz=local_tz),
    catchup=False,
    is_paused_upon_creation=True,
    dagrun_timeout=timedelta(minutes=60),
    tags=["CDP Data Synchronization"],
    params={"segment_id": ""},
) as dag:

    # segment_data_loader = PythonOperator(
    #     task_id='segment_data_loader', python_callable=segment_data_loader, provide_context=True)

    profile_data_loader = PythonOperator(
        task_id='profile_data_loader', python_callable=profile_data_loader_service, provide_context=True)

    contact_validation = PythonOperator(
        task_id='contact_validation', python_callable=contact_validation_service, provide_context=True)

    send_contact_to_bizfly = PythonOperator(
        task_id='send_contact_to_bizfly',  python_callable=process_send_contact_to_bizfly, provide_context=True)

# segment_data_loader >> profile_data_loader >> contact_validation >> send_contact_to_bizfly
profile_data_loader >> contact_validation >> send_contact_to_bizfly