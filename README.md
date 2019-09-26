# FrontMania Conference 2019 Mobile App

## Development

### API

Fire up docker-compose to run the API:

```
docker-compose up -d
```

Now you have a strapi app on `http://localhost:1337`. You can access:

- Admin Panel at [http://localhost:1337/admin]
- GraphQL API at [http://localhost:1337/graphql]

### APP

Install dependencies and launch an iOS simulator:

```
cd app
yarn install
yarn ios
```

## FAQ

### How do I update the database backup?

You can create a database backup in `db-backup/` with following:

```sh
./scripts/backup-database.sh
```

### How do I restore the database?

You can restore the database from the backup in `db-backup/` folder using:

```sh
./scripts/restore-database.sh
```
