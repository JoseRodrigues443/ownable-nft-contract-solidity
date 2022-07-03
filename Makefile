.PHONY: all test clean

compile:
	npx hardhat compile

eslint:
	npm run lint

solhint:
	npm run solhint

lint:
	make eslint
	make solhint

test-report:
	REPORT_GAS=true npx hardhat test

dev:
	make compile
	make lint
	make test-report

test:
	npx hardhat test

size:
	npx hardhat size-contracts
	echo "A contract should be less than 24KB"

console:
	npx hardhat console
