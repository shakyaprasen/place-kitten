#!/bin/bash
PATH=$PATH:/snap/bin
GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS
gsutil -m rsync -r /home/kajiprasen/place-kitten/server/storage/ gs://place-kitten-bucket/storage/
