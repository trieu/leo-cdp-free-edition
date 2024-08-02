# Airflow DAG folder

## How to run https://airflow.apache.org/docs/apache-airflow/stable/start.html

```
	export AIRFLOW_HOME=~/airflow

	AIRFLOW_VERSION=2.9.3

	# Extract the version of Python you have installed. If you're currently using a Python version that is not supported by Airflow, you may want to set this manually.
	# See above for supported versions.
	PYTHON_VERSION="$(python -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')"

	CONSTRAINT_URL="https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"
	# For example this would install 2.9.3 with python 3.8: https://raw.githubusercontent.com/apache/airflow/constraints-2.9.3/constraints-3.8.txt

	sudo apt install python3-pip python-is-python3
	python -m pip install -U pip
	pip install --user redis "apache-airflow==${AIRFLOW_VERSION}" --constraint "${CONSTRAINT_URL}" 
```