#!/usr/bin/env bash

restore() {
  docker-compose exec db bash -c "cd /db-backup; mongorestore --drop"
}

restore
