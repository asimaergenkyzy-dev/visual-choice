# VISUAL CHOICE

Gemini Canvas-тан экспортталған TSX негізіндегі React/Vite PWA жобасы.

## Жергілікті іске қосу

Node.js 20+ орнатыңыз. Терминалда:

```bash
npm install
npm run dev
```

Өндірістік жинақ: `npm run build`. Vercel: GitHub репозиторийін Import етіп, Framework Vite, Build Command `npm run build`, Output Directory `dist` таңдаңыз.

## Телефонға орнату

Сайт HTTPS арқылы жарияланғаннан кейін Android Chrome мәзірінен Install app / Add to Home screen, iPhone Safari Share мәзірінен Add to Home Screen таңдаңыз.

## Маңызды шектеулер

- Shop Check нақты Instagram API/серверге қосылмаған. Жалған статистика шығаратын fallback алынып тасталды.
- Мұғалім панелінің үлгілік көрсеткіштері нақты зерттеу деректері емес; оларды шынайы дерекпен қосымша жасау қажет.
- Тест нәтижесі осы браузердің localStorage-інде ғана сақталады. Оқушылардың ортақ базасы жоқ.
- Сыртқы mavlenai.kz фон суреттері интернетсіз жүктелмейді.
- Қазіргі PWA manifest және белгішелер бар, бірақ толық офлайн кэштеу service worker әлі қосылмаған.
- Код бастапқы бір файлдық прототип негізінде сақталған; TypeScript тексеруі бастапқы файлда өшірілген.

API кілттерін frontend-ке немесе GitHub-қа жарияламаңыз.
