import { Context, Schema } from "koishi";

export const name = "custom-reply";

export interface Config {
    template: { command: string; description: string; reply: string }[];
}

export const Config: Schema<Config> = Schema.object({
    template: Schema.array(
        Schema.object({
            command: Schema.string().required().description("触发指令"),
            description: Schema.string().description("指令描述"),
            reply: Schema.string()
                .role("textarea", { rows: [4, 10] })
                .required()
                .description("对应回复")
        })
    ).description("自定义指令回复列表")
}).description("自定义指令回复");

export function apply(ctx: Context, config: Config): void {
    for (const template of config.template) {
        ctx.command(template.command, template.description || "").action((): string => {
            return template.reply;
        });
    }
}
