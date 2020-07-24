#!/usr/bin/env node

// const { program } = require('commander');
// program.version('0.0.1');
const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');


;(async function () {try {await main()} catch (err) {console.error(err)}})()

// 入口
async function main() {await entry()}

async function entry_20200724225443() {
  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

  program.parse(process.argv);

  if (program.debug) console.log(program.opts());
  console.log('pizza details:');
  if (program.small) console.log('- small pizza size');
  if (program.pizzaType) console.log(`- ${program.pizzaType}`);
}

function entry_20200724225525() {
  program
    .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

  program.parse(process.argv);

  console.log(`cheese: ${program.cheese}`);
}

function entry_20200724225752() {
  program
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese')
    .parse(process.argv);
  const sauceStr = program.sauce ? 'sauce' : 'no sauce';
  const cheeseStr = (program.cheese === false) ? 'no cheese' : `${program.cheese} cheese`;
  console.log(`You ordered a pizza with ${sauceStr} and ${cheeseStr}`);
}

function entry_20200724225923() {
  program
    .option('-c, --cheese [type]', 'Add cheese with optional type');

  program.parse(process.argv);

  if (program.cheese === undefined) console.log('no cheese');
  else if (program.cheese === true) console.log('add cheese');
  else console.log(`add cheese type ${program.cheese}`);
}


function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and an optional radix
  return parseInt(value);
}

function increaseVerbosity(dummyValue, previous) {
  return previous + 1;
}

function collect(value, previous) {
  return previous.concat([value]);
}

function commaSeparatedList(value, dummyPrevious) {
  return value.split(',');
}

function entry_20200724230414() {
  program
    .option('-f, --float <number>', 'float argument', parseFloat)
    .option('-i, --integer <number>', 'integer argument', myParseInt)
    .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
    .option('-c, --collect <value>', 'repeatable value', collect, [])
    .option('-l, --list <items>', 'comma separated list', commaSeparatedList)
  ;

  program.parse(process.argv);

  if (program.float !== undefined) console.log(`float: ${program.float}`);
  if (program.integer !== undefined) console.log(`integer: ${program.integer}`);
  if (program.verbose > 0) console.log(`verbosity: ${program.verbose}`);
  if (program.collect.length > 0) console.log(program.collect);
  if (program.list !== undefined) console.log(program.list);
}

function entry_20200724230519() {
  program
    .requiredOption('-c, --cheese <type>', 'pizza must have cheese');

  program.parse(process.argv);
}

function entry_20200724231005() {
  program.version('1.0.1', '-v, --vers', 'output the current version');

  program
    .option('-n, --number <numbers...>', 'specify numbers')
    // .option('-l, --letter [letters...]', 'specify letters')
    .option('-l', 'specify letters');

  program.parse();

  console.log('Options: ', program.opts());
  console.log('Remaining arguments: ', program.args);


}

function entry_20200724231257() {
  // 通过绑定处理函数实现命令（这里的指令描述为放在`.command`中）
  // 返回新生成的命令（即该子命令）以供继续配置
  program
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
      console.log('clone command called');
    });

  // 通过独立的的可执行文件实现命令 (注意这里指令描述是作为`.command`的第二个参数)
  // 返回最顶层的命令以供继续添加子命令
  program
    .command('start <service>', 'start named service')
    .command('stop [service]', 'stop named service, or all if no name supplied');

  // 分别装配命令
  // 返回最顶层的命令以供继续添加子命令
  // program
  //   .addCommand(build.makeBuildCommand());
}

function entry_20200724231410() {
  program
    .command('build')
    .description('build web site for deployment')
    .action(() => {
      console.log('build');
    });

  program
    .command('deploy')
    .description('deploy web site to production')
    .action(() => {
      console.log('deploy');
    });

  program
    .command('serve', { isDefault: true })
    .description('launch web server')
    .option('-p,--port <port_number>', 'web port')
    .action((opts) => {
      console.log(`server on port ${opts.port}`);
    });

  program.parse(process.argv);
}

function entry() {
  // Add nested commands using `.command()`.
  const brew = program.command('brew');
  brew
    .command('tea')
    .action(() => {
      console.log('brew tea');
    });
  brew
    .command('coffee')
    .action(() => {
      console.log('brew coffee');
    });

  // Add nested commands using `.addCommand().
  // The command could be created separately in another module.
  function makeHeatCommand() {
    const heat = new Command('heat');
    heat
      .command('jug')
      .action(() => {
        console.log('heat jug');
      });
    heat
      .command('pot')
      .action(() => {
        console.log('heat pot');
      });
    return heat;
  }
  program.addCommand(makeHeatCommand());

  program.parse(process.argv);
}