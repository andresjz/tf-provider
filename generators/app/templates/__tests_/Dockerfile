FROM golang:latest

RUN apt-get update \ 
    && apt-get install -y gnupg software-properties-common curl -y lsb-release && apt-get clean all \
    && curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add -

# For some reason this line is having error when run in one line
# https://stackoverflow.com/questions/56563592/error-occurring-during-the-signature-verification-of-apt-get-update
RUN apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main" 

RUN apt-get update && apt-get install terraform \
    && mkdir /tf \
    && cd  /tf \
    && go mod init tf \
    && go get github.com/gruntwork-io/terratest/modules/terraform \
    && go get github.com/stretchr/testify/assert
