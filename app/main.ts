type CommandObject = Record<string, () => any>;

export class CommandManagerClass {
	private commands: CommandObject[];

	constructor() {
		this.commands = [];
	}

	register(newCommand: () => any) {
		const commandName = newCommand.name;

		this.commands.push({ [`${commandName}`]: newCommand });
	}

	availaableCommands() {
		return this.commands.map((command) => {
			return Object.keys(command)[0];
		});
	}
}

export function CommandManager() {
	return new CommandManagerClass();
}

const app = CommandManager();

function testFunction() {}
const testFunction2 = () => {};

app.register(testFunction);
app.register(testFunction2);

console.log(app.availaableCommands());
