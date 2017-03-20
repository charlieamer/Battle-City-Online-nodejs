import { IIdentifier } from './iidentifier';
export interface IReduxReducer extends IIdentifier {
    reduce(action: any, value: any);
}