#!/bin/bash
gcloud auth activate-service-account --key-file ~/.secrets/Kittens-fbcec4490df3.json
gsutil -m rsync -r ./storage/ gs://place-kitten-bucket/storage/
