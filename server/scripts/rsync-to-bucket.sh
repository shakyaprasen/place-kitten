#!/bin/bash

/snap/bin/gcloud auth activate-service-account --key-file /home/kajiprasen/.secrets/Kittens-fbcec4490df3.json
/snap/bin/gsutil -m rsync -r /home/kajiprasen/place-kitten/server/storage/ gs://place-kitten-bucket/

