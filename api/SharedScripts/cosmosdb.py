from typing import Container
import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.exceptions as exceptions
from azure.cosmos.partition_key import PartitionKey
import os

HOST = os.getenv("functions_gocchandesu_host")
MASTER_KEY = os.getenv("functions_gocchandesu_masterkey")
DATABASE_ID = 'Gocchandesu'
CONTAINER_ID_GROUPS = 'Groups'

CLIENT = cosmos_client.CosmosClient(HOST, {'masterKey': MASTER_KEY}, user_agent="CosmosDBPythonQuickstart", user_agent_overwrite=True)
try:
    DATABASE = CLIENT.create_database(id=DATABASE_ID)
    print('Database with id \'{0}\' created'.format(DATABASE_ID))
except exceptions.CosmosResourceExistsError:
    DATABASE = CLIENT.get_database_client(DATABASE_ID)
    print('Database with id \'{0}\' was found'.format(DATABASE_ID))

# コンテナを作成する関数
def create_containers(container_id):
    print('\nCreating Containers\n')
    try:
        container = DATABASE.create_container(id=container_id, partition_key=PartitionKey(path='/partitionKey'))
        print('Container with id \'{0}\' created'.format(container_id))
    except exceptions.CosmosResourceExistsError:
        container = DATABASE.get_container_client(container_id)
        print('Container with id \'{0}\' was found'.format(container_id))
    return container

# グループを作成する関数
def create_group(group_id, group_name, num, url_pay, user_id, total, unixtime):
    print('\nCreating Group\n')
    container = create_containers(container_id=CONTAINER_ID_GROUPS)
    item = {
        'id': group_id,
        'partitionKey': group_id,
        'name': group_name,
        'num': num,
        'url_pay': url_pay,
        'user_id': user_id,
        'total': total,
        'unixtime': unixtime
    }
    container.create_item(body=item)
    return item

# ユーザを作成する関数
def create_user(group_id, user_id, user_name, role, age, gender, point, url_photo, unixtime):
    print('\nCreating User\n')
    container = create_containers(container_id=group_id)
    item = {
        "id": user_id,
        "partitionKey": user_id,
        "name": user_name,
        "role": role,
        "age": age,
        "gender": gender,
        "point": point,
        "url_photo": url_photo,
        "group_id": group_id,
        "unixtime": unixtime
    }
    container.create_item(body=item)
    return item

# グループを登録する関数
def register_group(group_id, group_name, num, url_pay, user_id, user_name, role, age, gender, total, point, url_photo, unixtime):
    print('\Reister Group\n')
    group = create_group(group_id=group_id, group_name=group_name, num=num, url_pay=url_pay, user_id=user_id, total=total, unixtime=unixtime)
    user = create_user(group_id=group_id, user_id=user_id, user_name=user_name, role=role, age=age, gender=gender, point=point, url_photo=url_photo, unixtime=unixtime)
    items = {
        "group": {
            'id': group['id'],
            'partitionKey': group['partitionKey'],
            'name': group['name'],
            'num': group['num'],
            'url_pay': group['url_pay'],
            'user_id': group['user_id'],
            'total': group['total'],
            'unixtime': group['unixtime']
        },
        "user": {
            'id': user['id'],
            'partitionKey': user['partitionKey'],
            'name': user['name'],
            'role': user['role'],
            'age': user['age'],
            'gender': user['gender'],
            "point": user['point'],
            "url_photo": user['url_photo'],
            'group_id': user['group_id'],
            'unixtime': user['unixtime']
        }
    }
    return items

# グループに属するユーザ一覧を取得する関数
def get_users(group_id):
    print('\nGetting Users\n')
    container = create_containers(container_id=group_id)
    users = list(container.read_all_items())
    return users