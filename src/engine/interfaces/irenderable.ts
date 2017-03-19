import { IRenderer } from './irenderer';
// Anything that could be rendered on screen (basically only entity extends this interface)
export interface IRenderable {
    // Do transforms on canvas before rendering
    prepareRender(renderer: IRenderer);
    // Draw the element on canvas
    render(renderer: IRenderer);
    // Cleanup renderer after rendering (e.g. cleaning up transformations)
    cleanRender(renderer: IRenderer);
}