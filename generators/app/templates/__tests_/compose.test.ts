import { StartedDockerComposeEnvironment, DockerComposeEnvironment, Wait } from "testcontainers";
import * as fs from "fs";

let environment: StartedDockerComposeEnvironment;

beforeAll(async () => {
  environment = await new DockerComposeEnvironment(__dirname, "../docker-compose.yml")
    .up();

});

afterAll(async () => {
  await environment.down();
});

jest.setTimeout(20000);
test("generate_docs", async () => {

  const stream = await environment.getContainer("docs_1").logs();
  let logs = ""
  stream
    .on("data", line => logs+=line)
    .on("err", line => console.error(line))
    .on("end", () => {
      console.log("Docs container Stopped")
      writeToFile(logs)
    });
});

test("check_format", async () => {

  const stream = await environment.getContainer("tffmt_1").logs();
  let logs = ""
  stream
    .on("data", line =>  logs += 'FMT ERROR:' + line)
    .on("err", line => console.error(line))
    .on("end", () => {
      console.log("Fmt check container Stopped")
      if(logs != ""){
        console.log('Format Applied: \n \x1b[36m' + logs + '\x1b[0m');
      }

    });
});

test("apply_format", async () => {

  const stream = await environment.getContainer("tfapplyfmt_1").logs();
  let logs = ""
  stream
    .on("data", line => logs += 'FMT ERROR:' + line)
    .on("err", line => console.error(line))
    .on("end", () => {
      console.log("Fmt container Stopped")
      if(logs != ""){
        throw new Error('You have some errors in your terraform provider: \n \x1b[31m' + logs + '\x1b[0m');
      }

    });
});

test("run_checkov", async () => {

  const stream = await environment.getContainer("checkov_1").logs();
  let logs = ""
  let error: boolean;
  stream
    .on("data", line =>  {
      logs += line;
      if(line.includes("FAILED")){
        error = true;
      }
    })
    .on("err", line => console.error(line))
    .on("end", () => {
      console.log("Checkov container Stopped")
      if(error){
        throw new Error('You have some errors found during the checkov analys: \n \x1b[31m' + logs + '\x1b[0m');
      }else{
        console.log('\x1b[36m' + logs + '\x1b[0m');
      }

    });
});

test("run_tflint", async () => {

  const stream = await environment.getContainer("tflint_1").logs();
  let logs = ""
  stream
    .on("data", line => logs += line)
    .on("err", line => console.error(line))
    .on("end", () => {
      console.log("TFLint container Stopped")
      if(logs != ""){
        throw new Error('You have linting errors your terraform provider: \n \x1b[31m' + logs + '\x1b[0m');
      }
    });
});


function writeToFile(content: string){
  try {
    const data = fs.writeFileSync('RESOURCES.md', content, { flag: 'w+' })
  } catch (err) {
    console.error(err)
  }
}
