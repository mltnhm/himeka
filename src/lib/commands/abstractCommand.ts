import ConfigManager from '../configManager'

/**
 * AbstractCommand
 *
 * Base class for all commands
 */
abstract class AbstractCommand {
  protected args: any[]
  protected config: ConfigManager

  /**
   * Constructor
   */
  constructor(args: any[], config: ConfigManager) {
    this.args = args
    this.config = config
  }

  /**
   * Name of the command
   */
  public commandName: string = 'abstract-command'

  /**
   * Event type of the command
   * https://discord.js.org/#/docs/main/stable/class/Client
   */
  public event: string = 'TODO: Not implemented'

  /**
   * Getter for the command name.
   */
  get name() {
    return this.commandName
  }

  /**
   * Setter for the command name.
   */
  set name(commandName: string) {
    this.commandName = commandName
  }

  /**
   * Wrapping function for command()
   *
   * Put code here that handles superficial stuff users don't
   * need to mess with
   */
  execute() {
    this.command()
  }

  /**
   * Code relevant to commands, which needs to be written in
   * extended classes from this one
   */
  command() {
    throw new Error('TODO: Not implemented')
  }
}

export default AbstractCommand
