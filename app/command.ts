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

	getCommand(commandName: string) {
		const command = this.commands.find((command) => command[commandName]);

		if (!command) throw new Error("Command not found");

		return command[commandName];
	}
}

export function CommandManager() {
	return new CommandManagerClass();
}
