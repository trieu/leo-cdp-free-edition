from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from redis_connection  import connect_to_redis

# Define the default_args dictionary
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2023, 9, 1),
    'retries': 1,
}

# Example task to set a key in Redis
def set_redis_key(**kwargs):
    r = connect_to_redis()
    r.set('test_key', 'test_value')
    print("Key set in Redis")

# Example task to get a key from Redis
def get_redis_key(**kwargs):
    r = connect_to_redis()
    value = r.get('test_key')
    print(f"Key fetched from Redis: {value.decode('utf-8')}")

# Instantiate the DAG
with DAG('redis_airflow_dag', default_args=default_args, schedule_interval='@daily') as dag:
    set_key_task = PythonOperator(
        task_id='set_redis_key',
        provide_context=True,
        python_callable=set_redis_key,
    )

    get_key_task = PythonOperator(
        task_id='get_redis_key',
        provide_context=True,
        python_callable=get_redis_key,
    )

# Define task dependencies
set_key_task >> get_key_task
