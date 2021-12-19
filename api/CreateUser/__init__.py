import logging
import azure.functions as func
import uuid
import time
import json

from ..SharedScripts import cosmosdb


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    group_id = req.params.get('group_id')
    name = req.params.get('name')
    role = req.params.get('role')
    age = req.params.get('age')
    gender = req.params.get('gender')

    if not group_id and not name and not role and not age and not gender:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            group_id = req_body.get('group_id')
            name = req_body.get('name')
            role = req_body.get('role')
            age = req_body.get('age')
            gender = req_body.get('gender')
    if group_id and name and role and age and gender:
        user_id = str(uuid.uuid4())
        unixtime = time.time()
        point=1
        url_photo=''
        user = cosmosdb.create_user(group_id=group_id, user_id=user_id, user_name=name, role=role, age=age, gender=gender, point=point, url_photo=url_photo, unixtime=unixtime)
        return func.HttpResponse(
            json.dumps(user),
            status_code=200
        )
    else:
        return func.HttpResponse(
            'Wrong Arguments',
            status_code=450
        )
