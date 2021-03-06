# <%= name %>
## Overview

<%= description %>

## Development

### Prerequisites

Nothing else than nodejs and docker, all tools are running under docker and listed now in the
* [terraform-docs](https://github.com/segmentio/terraform-docs)
* [checkov](https://github.com/segmentio/terraform-docs)
* [terraform-lint](https://github.com/segmentio/terraform-docs)
* [terraform-fmt](https://github.com/segmentio/terraform-docs)

But if you want to run something locally you can check:

- [terraform](https://learn.hashicorp.com/terraform/getting-started/install#installing-terraform)
- [terraform-docs](https://github.com/segmentio/terraform-docs)
- [pre-commit](https://pre-commit.com/#install)
- [golang](https://golang.org/doc/install#install)


### Configurations

- Configure pre-commit hooks
```sh
pre-commit install
```

Tests and checks are configured to run in docker so the only requirement is to install it, then you can run:

```sh
yarn install
yarn jest
```

### Tests

## Docker

To run terratest in docker:

`docker-compose run terratest` or `yarn terratest`

## Local
- If you prefer to install go locally, configure golang deps for tests 
```sh
go get github.com/gruntwork-io/terratest/modules/terraform
go get github.com/stretchr/testify/assert
```

Then got to the test/ dir and excute tests

```sh
cd test/
go test -v

```
## Authors

This project is authored by below people

- <%= author %>

> This project was generated by [generator-tfp](https://github.com/andresjz/tf-provider)
