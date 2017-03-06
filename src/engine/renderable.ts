// Anything that could be rendered on screen (basically only entity extends this interface)
export interface Renderable {
    // Update logic
    update();
    // Do transforms on canvas before rendering
    prepareRender(canvas: CanvasRenderingContext2D);
    // Draw the element on canvas
    render(canvas: CanvasRenderingContext2D);
    // Cleanup renderer after rendering (e.g. cleaning up transformations)
    cleanRender(canvas: CanvasRenderingContext2D);
}