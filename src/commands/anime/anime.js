const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const malScraper = require("mal-scraper");
const translate = require("@iamtraction/google-translate");
const moment = require("moment");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class Anime extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "anime";
    this.category = "Anime";
    this.description = "Faça uma pesquisa sobre o Anime desejado.";
    this.usage = "anime";
    this.aliases = [];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author, language }, t) {
    const search = args.join(" ");

    if (!search)
      return message.channel.send(
        `${message.author}, insira o nome do anime que deseja pesquisar.`
      );

    const data = await malScraper.getInfoFromName(search);

    const trad = await translate(data.synopsis, {
      to: language.slice(0, 2),
    });

    const date = data.aired.split(" to ").map((x) => x.replace(",", ""));

    const ANIME = new ClientEmbed(author)
      .setDescription(
        `${Emojis.Naruto}**[${data.title}](${data.url})**\n${
          trad.text.length > 900 ? trad.text.slice(0, 900) + "..." : trad.text
        }`
      )
      .setThumbnail(data.picture)
      .addFields(
        {
          name: `${Emojis.List} Episódios`,
          value: data.episodes.toLocaleString(),
          inline: true,
        },
        {
          name: `${Emojis.Type} Tipo`,
          value: data.type,
          inline: true,
        },
        {
          name: `${Emojis.Leadership} Rank`,
          value: data.ranked,
          inline: true,
        },
        {
          name: `❤️ Popularidade`,
          value: data.popularity,
          inline: true,
        },
        {
          name: `${Emojis.Status} Status`,
          value: data.status
            .replace("Finished Airing", "Finalizado")
            .replace("Currently Airing", "Em produção"),
          inline: true,
        },
        {
          name: `${Emojis.Categoria} Origem`,
          value: data.source,
          inline: true,
        },
        {
          name: `${Emojis.Waiting} Estreou em`,
          value:
            date[1] == "?" || !date[1]
              ? `**${moment(new Date(date[0])).format("L")}**`
              : `**${moment(new Date(date[0])).format("L")}** - **${moment(
                  new Date(date[1])
                ).format("L")}**`,
          inline: true,
        },
        {
          name: `${Emojis.Duration} Duração por EP`,
          value: data.duration.replace(". per ep", ""),
          inline: true,
        },
        {
          name: `${Emojis.Genre} Gêneros`,
          value: data.genres.map((x) => x).join(", "),
          inline: false,
        },
        {
          name: `⭐ Avaliação`,
          value: data.score,
          inline: true,
        }
      );

    if (data.trailer != undefined)
      ANIME.addField(
        `${Emojis.Multimedia} Trailer`,
        `**[Clique Aqui](${data.trailer})**`,
        true
      );

    message.channel.send(message.author, ANIME).catch((err) => {
      console.log(err);
      return message.channel.send(`${message.author}, anime não encontrado.`);
    });
  }
};