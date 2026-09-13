# web/ ― Mercury 紹介サイト

静的ファイルだけの2ページ。ビルド不要、そのまま置けば動く。

```
web/
├── index.html        アプリ紹介
├── privacy.html      プライバシーポリシー
└── assets/
    ├── style.css     2ページ共通
    ├── site.js       日英の切り替え（選んだ言語を localStorage に記憶）
    ├── icon.png      512px（元は icon/ICON.png）
    ├── favicon.png   180px
    └── shots/        level-01 / 05 / 10 / 13 / 16.png（720px幅）
```

## 日英の切り替え

1ファイルに両言語を入れてある。`<span lang="ja">…</span><span lang="en">…</span>` と並べて書き、
`html[data-lang]` で片方だけ表示する（`style.css` の冒頭）。初回は端末の言語、以降は選んだ方を覚える。

**文言を足すときは必ず日英そろえて書く。** 片方だけ書くと、その言語のときに何も出ない。

## 挿絵の差し替え

いまは実機（iPhone 16 Pro / 1206×2622）のスクリーンショットを縮めて入れてある。
**同じファイル名で上書きすれば差し替わる**（HTML を触る必要はない）。

| 置き場所 | 使い道 | 推奨 |
|---|---|---|
| `assets/shots/stage-16.png` | ヒーローの端末画面 | 実機のスクショ、幅 760px |
| `assets/shots/menu.png` | 一覧の1枚目（面えらび） | 実機のスクショ、幅 620px |
| `assets/shots/stage-04.png` | 一覧の2枚目 | 同上 |
| `assets/shots/stage-15.png` | 一覧の3枚目 | 同上 |
| `assets/shots/stage-16-s.png` | 一覧の4枚目 | 同上 |
| `assets/icon.png` | ヘッダ・OG画像 | 正方形 512px |
| `assets/favicon.png` | タブ・ホーム画面 | 正方形 180px |

枚数を増やすなら `index.html` の `.shots` に `<figure class="shot">` を足す。

縮小はこれで足りる:

```sh
sips -Z 620 元の画像.png --out web/assets/shots/menu.png
```

## 公開（GitHub Pages の場合）

```sh
cd web
git init && git add . && git commit -m "site"
gh repo create mercury-site --public --source=. --push
gh api -X POST repos/:owner/mercury-site/pages -f source[branch]=main -f source[path]=/
```

公開先は `https://<ユーザー名>.github.io/mercury-site/`。

## App Store Connect に入れる URL

| 欄 | URL |
|---|---|
| プライバシーポリシー URL（必須） | `…/privacy.html` |
| サポート URL（必須） | `…/index.html#support` |
| マーケティング URL（任意） | `…/index.html` |

## 提出前に直すところ

- **App Store のリンク** … `index.html` のバッジが `href="#"`（近日公開）のまま。
  審査を通ったら実際の URL に差し替える。
- **連絡先メール** … 2ページとも `akky0926@gmail.com`。公開されるので、
  問い合わせ用に別のアドレスを使うならここを直す。
- **発効日** … `privacy.html` 冒頭の「2026年9月12日」。公開日に合わせる。
