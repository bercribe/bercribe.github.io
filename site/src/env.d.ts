declare module "glslCanvas" {
    export default class GlslCanvas {
        constructor(canvas: HTMLCanvasElement);
        load(source: string): void;
        destroy(): void;
    }
}
