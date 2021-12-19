import logging
import azure.functions as func
import uuid
import json
import time

from ..SharedScripts import cosmosdb


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    group_name = req.params.get('group_name')
    num = req.params.get('num')
    url_pay = req.params.get('url_pay')
    user_name = req.params.get('user_name')
    role = req.params.get('role')
    age = req.params.get('age')
    gender = req.params.get('gender')
    total = req.params.get('total')
    if not group_name and not num and not url_pay and not user_name and not role and not age and not gender and not total:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            group_name = req_body.get('group_name')
            num = req_body.get('num')
            url_pay = req_body.get('url_pay')
            user_name = req_body.get('user_name')
            role = req_body.get('role')
            age = req_body.get('age')
            gender = req_body.get('gender')
            total = req_body.get('total')

    if group_name and num and url_pay and user_name and role and age and gender:
        group_id = str(uuid.uuid4())
        user_id = str(uuid.uuid4())
        unixtime = time.time()
        point = 1
        url_photo = ''
        group_user = cosmosdb.register_group(group_id=group_id, group_name=group_name, num=num, url_pay=url_pay, user_id=user_id, user_name=user_name, role=role, age=age, gender=gender, total=total, point=point, url_photo=url_photo, unixtime=unixtime)
        return func.HttpResponse(
            json.dumps(group_user),
            status_code=200
        )
    else:
        return func.HttpResponse(
            'Wrong Arguments',
            status_code=450
        )
