#!/usr/bin/env bash

backup() {
  docker-compose exec db bash -c "rm -rf /db-backup/dump; cd /db-backup; mongodump -d strapi"
}

backup
