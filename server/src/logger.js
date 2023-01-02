const { createLogger, format, transports } = require('winston');

const koreanTime = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Seoul',
  });

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'combined.log',
      format: format.combine(
        format.timestamp({ format: koreanTime }),
        format.json(),
      ),
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: 'info',
      colorize: true,
      format: format.combine(
        format.timestamp({ format: koreanTime }),
        format.simple(),
      ),
    }),
  );
}

module.exports = logger;
