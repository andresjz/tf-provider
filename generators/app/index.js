'use strict';
var Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator { };

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.log(
      yosay('Welcome to the tf-module generator v0.1.0!')
    );

    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Enter name for the new terraform provider : ',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description for the new terraform provider : ',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter author name : ',
    },
    {
      type: 'list',
      name: 'tfversion',
      message: 'Choose terraform version',
      choices: [
        {
          name: '1.1.5.',
          value: '5',
          checked: true
        },
        {
          name: '1.1.4.',
          value: '4',
        }
      ]
    }
    ]);
  }

  writing() {
    this.destinationRoot(this.answers.name);

    this.fs.copyTpl(
      `${this.templatePath()}/**/*.tf`,
      `${this.destinationRoot()}/tf`
    );

    this.fs.copyTpl(
      `${this.templatePath()}/__tests_/*`,
      `${this.destinationRoot()}/__tests_`
    );

    this.fs.copyTpl(
      `${this.templatePath()}/test/terratest/*`,
      `${this.destinationRoot()}/test`
    );

    this.fs.copyTpl(
      `${this.templatePath()}/.editorconfig`,
      `${this.destinationRoot()}/.editorconfig`
    );

    this.fs.copyTpl(
      this.templatePath('.gitignorefile'),
      this.destinationPath(`.gitignore`), {
      testFramework: this.answers.testFramework
    }
    );

    this.fs.copyTpl(
      this.templatePath('.gitattributesfile'),
      this.destinationPath(`.gitattributes`), {
      testFramework: this.answers.testFramework
    }
    );

    this.fs.copyTpl(
      this.templatePath('.pre-commit-config.yaml'),
      this.destinationPath(`.pre-commit-config.yaml`), {
      testFramework: this.answers.testFramework
    }
    );

    this.fs.copyTpl(
      this.templatePath('tf/.terraform-version'),
      this.destinationPath(`tf/.terraform-version`), {
      tfversion: this.answers.tfversion
    }
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
      name: this.answers.name,
      description: this.answers.description,
      author: this.answers.author,
      testFramework: this.answers.testFramework
    }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
      name: this.answers.name,
      description: this.answers.description,
      author: this.answers.author,
      testFramework: this.answers.testFramework
    }
    );

    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml'), {
      name: this.answers.name,
      description: this.answers.description,
      author: this.answers.author,
      testFramework: this.answers.testFramework
    }
    );
  }

};
