import logging
import azure.functions as func
import json

from ..SharedScripts import cosmosdb


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    group_id = req.params.get('group_id')
    if not group_id:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            group_id = req_body.get('group_id')

    if group_id:
        users = cosmosdb.get_users(group_id=group_id)
        return func.HttpResponse(
            json.dumps(users),
            status_code=200
        )
    else:
        return func.HttpResponse(
            'Wrong Arguments',
            status_code=450
        )
