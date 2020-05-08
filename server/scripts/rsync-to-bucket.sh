#!/bin/bash

gsutil -m rsync -r ./storage/ gs://place-kitten-bucket/storage/
