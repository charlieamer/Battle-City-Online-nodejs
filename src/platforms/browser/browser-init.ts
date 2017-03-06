import { Engine } from '../../engine/engine';
import { BrowserRenderer } from './browser-renderer';
let engine = new Engine();
let renderer = new BrowserRenderer(<HTMLCanvasElement>document.getElementById('canvas'), engine);
