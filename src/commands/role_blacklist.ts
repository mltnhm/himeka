import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleBlacklistCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'blacklist-role'
  }

  static commandName() {
    return 'blacklist-roles'
  }

  static commandDescription() {
    return 'Prevents a role from being self-assigned'
  }

  command() {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)

    messageArguments.shift()
    const roleName = messageArguments.join(' ')

    Role.findOne({ where: { name: roleName } })
      .then(role => {
        if (role === null) {
          this.message.channel.send('Role does not exist!')
          throw new Error()
        }

        if (role.whitelisted === false) {
          this.message.channel.send('Role is already blacklisted!')
          throw new Error()
        }

        role
          .updateAttributes({
            whitelisted: false
          })
          .then(() => {
            this.message.channel.send(
              `Role \`${roleName}\` is now blacklisted!`
            )
          })
      })
      .catch(Error, () => {})
  }
}
