import {importAll} from '@/common/utilities/ImportAll';

const rawServices = importAll(import.meta.globEager('/src/api/**/*.service.ts'))

const services: any = {};
for (const i in rawServices) {
    const key = i.split('/')[3].split('.')[0].replace(/\//, '');
    services[key] = rawServices[i];
}

export default class ApiFactory {
    static instances: any = {};

    static get(name: string): any {
        if (this.instances[name] && !services[name])
            throw new Error('invalid service name!');
        if (!this.instances[name]) this.instances[name] = new services[name]();
        return this.instances[name];
    }
}