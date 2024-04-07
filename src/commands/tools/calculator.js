export default {
  data: {
    name: 'calc',
    aliases: ['calculator', 'calculate'],
    description: '',
  },
  run: async function (client, msg, args) {
    if (!args.length) return;

    const operators = ['+', '-', '*', '/'];

    // if (args.length === 1) {
    //   msg.channel.send(args[0]);
    //   return;
    // }

    if (
      args.length % 2 === 0 ||
      args.length < 3
      // || args.some((arg) => !operators.includes(arg))
    ) {
      return msg.channel.send('Invalid expression!');
    }

    try {
      const result = calculate(args, msg);
      if (result) msg.reply(`${String(result)}`);
    } catch (error) {
      message.channel.send(
        'An error occurred while calculating the expression.  Please make sure your input is a valid  mathematical expression.',
        error.message
      );
      console.log(error);
      throw error;
    }
  },
};

function calculate(args, msg) {
  let result = parseFloat(args[0]);
  for (let i = 1; i < args.length; i += 2) {
    const operator = args[i];
    const operand = parseFloat(args[i + 1]);

    switch (operator) {
      case '+':
        result += operand;
        break;
      case '-':
        result -= operand;
        break;
      case '*':
        result *= operand;
        break;
      case '/':
        if (operand === 0) {
          msg.channel.send('Division by zero is not allowed!');
          return;
        }
        result /= operand;
        break;
    }
  }
  return result;
}
