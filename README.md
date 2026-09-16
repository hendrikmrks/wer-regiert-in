# Wer regiert in?

![License](https://img.shields.io/github/license/hendrikmrks/wer-regiert-in)
![Issues](https://img.shields.io/github/issues/hendrikmrks/wer-regiert-in)
![Stars](https://img.shields.io/github/stars/hendrikmrks/wer-regiert-in)
![Forks](https://img.shields.io/github/forks/hendrikmrks/wer-regiert-in)

This project visualizes the political landscape of Germany's federal states. It provides an interactive map where users can click on a state to view detailed information about its government, population, and ministries.

> The live site is no longer online. This repository is kept public for reference and as open source code.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Planned Features](#planned-features)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

- `/` – frontend (Vite)
- `/api` – backend API that served the frontend (Express), formerly its own repository (`wer-regiert-in.de-api`), merged here for a single source

## Installation

```bash
# Clone the repository
git clone https://github.com/hendrikmrks/wer-regiert-in.git

# Navigate to the project directory
cd wer-regiert-in

# Install frontend dependencies
npm install

# Start the frontend dev server
npm run dev

# In a separate terminal, run the API
cd api
npm install
npm start
```

## Planned Features

- Multi language support
- Representation of the Federal Government
- Representation of previous governments

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

For major changes, please open an issue first to discuss what you would like to change. This ensures your time is well spent and your contribution can be successfully integrated.

## License

This project is licensed under the [CC BY-NC-SA License](LICENSE) - see the LICENSE file for details.
