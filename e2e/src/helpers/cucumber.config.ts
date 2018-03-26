import { defineSupportCode } from 'cucumber';

defineSupportCode(({setDefaultTimeout}) => {
    setDefaultTimeout(20000);
});

