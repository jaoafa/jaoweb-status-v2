import CheckDatabasejaoMain from './checks/database-jaomain'
import CheckDatabaseZakuroHat from './checks/database-zakurohat'
import CheckjMSDiscord from './checks/jms-gamers-club'
import CheckjMSMinecraft from './checks/jms-minecraft'
import CheckPingServer from './checks/ping-server'
import CheckServerZakuroHat from './checks/server-zakurohat'
import Help from './models/help'
import Service from './models/service'
import CheckRequestHead from './checks/request-head'
import CheckZakuroHatService from './checks/zakurohat-service'

export const SERVICES: Service[] = [
  {
    sid: 'jms-web',
    icon: 'mdi-web',
    name: 'jaoafa.com',
    tags: ['Web'],
    websiteUrl: 'https://jaoafa.com',
    reportUrl: 'https://github.com/jaoafa/jaoweb/issues/new/choose',
    check: new CheckRequestHead('jaoafa.com'),
    flex: 6,
  },
  {
    sid: 'jms-minecraft',
    icon: 'mdi-minecraft',
    name: 'play.jaoafa.com',
    tags: ['Minecraft'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckjMSMinecraft(),
    flex: 6,
  },
  {
    sid: 'jms-gamers-club',
    icon: 'mdi-discord',
    name: 'jMS Gamers Club',
    tags: ['Discord'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckjMSDiscord(),
    flex: 4,
  },
  {
    sid: 'discord-javajaotan2',
    icon: 'mdi-robot',
    name: 'Javajaotan2',
    tags: ['Discord', 'Bot'],
    websiteUrl: 'https://github.com/jaoafa/Javajaotan2',
    reportUrl: 'https://github.com/jaoafa/Javajaotan2/issues/new/choose',
    check: new CheckZakuroHatService('Javajaotan2'),
    flex: 4,
  },
  {
    sid: 'discord-jda-vcspeaker',
    icon: 'mdi-account-voice',
    name: 'JDA-VCSpeaker',
    tags: ['Discord', 'Bot'],
    websiteUrl: 'https://github.com/jaoafa/JDA-VCSpeaker',
    reportUrl: 'https://github.com/jaoafa/JDA-VCSpeaker/issues/new/choose',
    check: new CheckZakuroHatService('JDA-VCSpeaker'),
    flex: 4,
  },
  {
    sid: 'server-jaomain',
    icon: 'mdi-server',
    name: 'jaoMain',
    tags: ['Server'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckPingServer('jaoafa.com'),
    flex: 3,
  },
  {
    sid: 'server-zakurohat',
    icon: 'mdi-server',
    name: 'ZakuroHat',
    tags: ['Server'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckServerZakuroHat(),
    flex: 3,
  },
  {
    sid: 'database-jaomain',
    icon: 'mdi-database',
    name: 'jaoMainDB',
    tags: ['Database'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckDatabasejaoMain(),
    flex: 3,
  },
  {
    sid: 'database-zakurohat',
    icon: 'mdi-database',
    name: 'ZakuroHatDB',
    tags: ['Database'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckDatabaseZakuroHat(),
    flex: 3,
  },
  {
    sid: 'mojang-minecraftservices',
    icon: 'mdi-minecraft',
    name: 'minecraftservices.com',
    tags: ['Minecraft', 'Mojang Server'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckPingServer('api.minecraftservices.com'),
    flex: 3,
  },
  {
    sid: 'mojang-mojangcom',
    icon: 'mdi-minecraft',
    name: 'mojang.com',
    tags: ['Minecraft', 'Mojang Server'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckPingServer('mojang.com'),
    flex: 3,
  },
  {
    sid: 'mojang-minecraftnet',
    icon: 'mdi-minecraft',
    name: 'minecraft.net',
    tags: ['Minecraft', 'Mojang Server'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckPingServer('minecraft.net'),
    flex: 3,
  },
  {
    sid: 'mojang-minecraft-skins',
    icon: 'mdi-minecraft',
    name: 'AWS MinecraftSkins',
    tags: ['Minecraft', 'Mojang Server'],
    websiteUrl: null,
    reportUrl: null,
    check: new CheckPingServer('s3.amazonaws.com'),
    flex: 3,
  },
  {
    sid: 'jms-web-users',
    icon: 'mdi-account-details-outline',
    name: 'users.jaoafa.com',
    tags: ['Web'],
    websiteUrl: 'https://user.jaoafa.com',
    reportUrl: 'https://github.com/jaoafa/jaoweb-users/issues/new/choose',
    check: new CheckRequestHead('users.jaoafa.com'),
    flex: 3,
  },
  {
    sid: 'jms-web-map',
    icon: 'mdi-map',
    name: 'map.jaoafa.com',
    tags: ['Web'],
    websiteUrl: 'https://map.jaoafa.com',
    reportUrl: null,
    check: new CheckRequestHead('map.jaoafa.com'),
    flex: 3,
  },
  {
    sid: 'jms-web-wiki',
    icon: 'mdi-book-multiple-outline',
    name: 'wiki.jaoafa.com',
    tags: ['Web'],
    websiteUrl: 'https://wiki.jaoafa.com',
    reportUrl: null,
    check: new CheckRequestHead('wiki.jaoafa.com'),
    flex: 3,
  },
  {
    sid: 'jms-web-api',
    icon: 'mdi-api',
    name: 'api.jaoafa.com',
    tags: ['Web', 'Backend'],
    websiteUrl: 'https://api.jaoafa.com',
    reportUrl: null,
    check: new CheckRequestHead('api.jaoafa.com', 'api.jaoafa.com/v2'),
    flex: 3,
  },
]

export const HELPS: Help[] = [
  {
    sid: 'jms-web',
    title: 'jaoafa.com とは？',
    text: 'jao Minecraft Server の公式 Web サイトです。\n運営によるサーバの情報やルールなどが公開されています。',
  },
  {
    sid: 'jms-web',
    title: 'ステータスチェック方法',
    text: 'jaoafa.com に HEAD リクエストを発行し、レスポンスコードが 200 であるかを確認しています。',
  },
  {
    sid: 'jms-minecraft',
    title: 'play.jaoafa.com とは？',
    text: 'jao Minecraft Server が提供する Minecraft プレイサーバサービスです。',
  },
  {
    sid: 'jms-minecraft',
    title: 'ステータスチェック方法',
    text: 'play.jaoafa.com:25565 に接続試行を行い、接続できるかを確認しています。',
  },
  {
    sid: 'jms-gamers-club',
    title: 'jMS Gamers Club とは？',
    text: 'jao Minecraft Server が提供する公式 Discord サーバです。サーバ参加者同士の雑談や、運営への問い合わせを行うことができます。',
  },
  {
    sid: 'jms-gamers-club',
    title: 'ステータスチェック方法',
    text: '<a href="https://discordstatus.com">Discord Status</a> の情報を取得し、インシデントが発生していないかを確認しています。',
  },
  {
    sid: 'discord-javajaotan2',
    title: 'javajaotan2 とは？',
    text: 'jMS Gamers Club の Bot アカウント jaotan#6066 のメイン機能を制御しているアプリケーションです。',
  },
  {
    sid: 'discord-javajaotan2',
    title: 'ステータスチェック方法',
    text: '内部通信 API を利用し、Javajaotan2 が起動しているかを確認しています。',
  },
  {
    sid: 'discord-jda-vcspeaker',
    title: 'JDA-VCSpeaker とは？',
    text: 'jMS Gamers Club の Bot アカウント VCWatcher#0463 のメイン機能を制御しているアプリケーションです。<br>ボイスチャンネルの入退室やチャットの読み上げを行います。',
  },
  {
    sid: 'discord-jda-vcspeaker',
    title: 'ステータスチェック方法',
    text: '内部通信 API を利用し、JDA-VCSpeaker が起動しているかを確認しています。',
  },
  {
    sid: 'server-jaomain',
    title: 'jaoMain とは？',
    text: 'jao Minecraft Server のメインサーバ(VPS)です。データベースやいくつかのアプリケーションが稼働しています。',
  },
  {
    sid: 'server-jaomain',
    title: 'ステータスチェック方法',
    text: 'jaoMain に接続試行を行い、接続できるかを確認しています。',
  },
  {
    sid: 'server-zakurohat',
    title: 'ZakuroHat とは？',
    text: 'サーバ管理人である<a href="https://users.jaoafa.com/5799296a-d1ec-4252-93bd-440bb9caa65c">砂利(Zakuro / X4Z)</a>の自宅サーバです。<br>Minecraftサーバ・Javajaotan2・ZakuroHatDBなどが稼働しています。',
  },
  {
    sid: 'server-zakurohat',
    title: 'ステータスチェック方法',
    text: 'サーバ監視サービスによる死活監視の結果を取得し、稼働しているかを確認しています。',
  },
  {
    sid: 'database-jaomain',
    title: 'jaoMainDB とは？',
    text: 'jaoMain で稼働するデータベースサーバです。jao Minecraft Server の各種蓄積データが保存されています。',
  },
  {
    sid: 'database-jaomain',
    title: 'ステータスチェック方法',
    text: 'jaoMainDB にログイン試行を行い、ログインできるかを確認しています。',
  },
  {
    sid: 'database-zakurohat',
    title: 'ZakuroHatDB とは？',
    text: 'ZakuroHat で稼働するデータベースサーバです。CoreProtect のブロック編集データなど、Minecraft サーバに関する蓄積データが保存されています。',
  },
  {
    sid: 'database-zakurohat',
    title: 'ステータスチェック方法',
    text: 'ZakuroHatDB にログイン試行を行い、ログインできるかを確認しています。',
  },
  {
    sid: 'mojang-minecraftservices',
    title: 'minecraftservices.com とは？',
    text: 'Minecraft の販売元 Mojang の管理する Minecraft サービスサーバです。<br>詳しい情報は <a href="https://twitter.com/MojangStatus">Twitter @MojangStatus</a>をご覧ください。<br>公式のトラブルシューティングは<a href="https://help.minecraft.net/hc/en-us/articles/4408949606541-Minecraft-Java-Edition-Troubleshooting">こちら (英語)</a>',
  },
  {
    sid: 'mojang-minecraftservices',
    title: 'ステータスチェック方法',
    text: 'api.minecraftservices.com に PING を実施し、サーバが稼働しているかを確認しています。',
  },
  {
    sid: 'mojang-mojangcom',
    title: 'mojang.com とは？',
    text: 'Minecraft の販売元 Mojang のサイトです。<br>詳しい情報は <a href="https://twitter.com/MojangStatus">Twitter @MojangStatus</a>をご覧ください。<br>公式のトラブルシューティングは<a href="https://help.minecraft.net/hc/en-us/articles/4408949606541-Minecraft-Java-Edition-Troubleshooting">こちら (英語)</a>',
  },
  {
    sid: 'mojang-mojangcom',
    title: 'ステータスチェック方法',
    text: 'mojang.com に PING を実施し、サーバが稼働しているかを確認しています。',
  },
  {
    sid: 'mojang-minecraftnet',
    title: 'minecraft.net とは？',
    text: 'Minecraft の公式サイトです。<br>詳しい情報は <a href="https://twitter.com/MojangStatus">Twitter @MojangStatus</a>をご覧ください。<br>公式のトラブルシューティングは<a href="https://help.minecraft.net/hc/en-us/articles/4408949606541-Minecraft-Java-Edition-Troubleshooting">こちら (英語)</a>',
  },
  {
    sid: 'mojang-minecraftnet',
    title: 'ステータスチェック方法',
    text: 'minecraft.net に PING を実施し、サーバが稼働しているかを確認しています。',
  },
  {
    sid: 'mojang-minecraft-skins',
    title: 'AWS MinecraftSkins とは？',
    text: 'Mojang が管理する、Amazon Web Services 上の Minecraft スキン S3 バケットです。<br>詳しい情報は <a href="https://twitter.com/MojangStatus">Twitter @MojangStatus</a>をご覧ください。<br>公式のトラブルシューティングは<a href="https://help.minecraft.net/hc/en-us/articles/4408949606541-Minecraft-Java-Edition-Troubleshooting">こちら (英語)</a>',
  },
  {
    sid: 'mojang-minecraft-skins',
    title: 'ステータスチェック方法',
    text: 's3.amazonaws.com に PING を実施し、サーバが稼働しているかを確認しています。',
  },
  {
    sid: 'jms-web-users',
    title: 'users.jaoafa.com とは？',
    text: 'jao Minecraft Server で活動するユーザーの情報を表示する Web サイトです。',
  },
  {
    sid: 'jms-web-users',
    title: 'ステータスチェック方法',
    text: 'users.jaoafa.com に HEAD リクエストを発行し、レスポンスコードが 200 であるかを確認しています。',
  },
  {
    sid: 'jms-web-map',
    title: 'map.jaoafa.com とは？',
    text: 'jao Minecraft Server の Minecraft サーバマップを表示する Web サイトです。',
  },
  {
    sid: 'jms-web-map',
    title: 'ステータスチェック方法',
    text: 'map.jaoafa.com に HEAD リクエストを発行し、レスポンスコードが 200 であるかを確認しています。',
  },
  {
    sid: 'jms-web-wiki',
    title: 'wiki.jaoafa.com とは？',
    text: 'jaopedia と呼ばれています。jao Minecraft Server コミュニティに関する様々な情報がまとめられている Wiki です。',
  },
  {
    sid: 'jms-web-wiki',
    title: 'ステータスチェック方法',
    text: 'wiki.jaoafa.com に HEAD リクエストを発行し、レスポンスコードが 200 であるかを確認しています。',
  },
  {
    sid: 'jms-web-api',
    title: 'api.jaoafa.com とは？',
    text: 'jao Minecraft Server に関する情報が取得できる Web API サービスです。',
  },
  {
    sid: 'jms-web-api',
    title: 'ステータスチェック方法',
    text: 'api.jaoafa.com と api.jaoafa.com/v2 に HEAD リクエストを発行し、レスポンスコードが 200 であるかを確認しています。',
  },
]
