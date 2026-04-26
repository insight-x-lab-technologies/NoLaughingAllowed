    const DEFAULT_LANGUAGE = 'pt';
    const SETTINGS_KEY = 'npr_settings_v1';
    const CONTENT_KEY = 'npr_content_v1';
    const LEADERBOARD_KEY = 'npr_leaderboard_v1';
    const LEGACY_WORDS_KEY = 'npr_words_v1';
    const QUICK_GAME_KEY = 'npr_quick_game_v1';
    const USER_ID_KEY = 'npr_user_id_v1';
    const USER_ID_BACKUP_SCHEMA = 'naopoderir.user-id.v1';
    const MULTI_DEVICE_GUEST_RESUME_KEY = 'npr_multidevice_guest_resume_v1';
    const MULTI_DEVICE_GUEST_RESUME_TTL_MS = 1000 * 60 * 60 * 12;
    const MULTI_DEVICE_RECONNECT_MAX_DELAY_MS = 8000;
    const WAKE_LOCK_ACTIVE_SCREENS = ['multidevice', 'guest', 'setup', 'game', 'score', 'final'];
    const LAST_TEAMS_KEY = 'npr_last_teams';
    const LAST_FFA_KEY = 'npr_last_ffa';
    const APP_STORAGE_PREFIX = 'npr_';
    const AVAILABLE_THEMES = ['cosmic', 'liquid-glass', 'material3', 'light-mode', 'dark-mode', 'high-contrast'];
    const THEMES_WITH_MUSIC = ['cosmic', 'liquid-glass', 'material3'];
    const THEME_MUSIC_PREFIX = {
      cosmic: 'cosmic',
      'liquid-glass': 'autumn',
      material3: 'spring',
      'light-mode': 'light',
      'dark-mode': 'dark',
      'high-contrast': 'contrast'
    };
    const GAMEPLAY_MUSIC_SCREENS = ['game', 'score', 'final', 'guest'];
    const MUSIC_ASSET_BASE = './assets/songs';
    const SUPPORTED_LANGUAGES = ['pt', 'en'];
    const LANGUAGE_HTML_MAP = { pt: 'pt-BR', en: 'en', es: 'es', fr: 'fr', de: 'de', it: 'it' };
    const LEADERBOARD_MODE_KEYS = ['mimeTeams', 'mimeFfa', 'drawingTeams', 'drawingFfa'];
    const LEADERBOARD_PAGE_SIZE = 10;
    const LEADERBOARD_DEFAULT_AVATAR = './assets/player-default.svg';
    const DIFFICULTY_KEYS = ['easy', 'normal', 'hard'];
    const LEGACY_WORD_CATEGORY_KEYS = ['objects', 'actions', 'animals', 'movies', 'professions', 'celebrities'];
    const CATEGORY_KEYS = ['trocadilhos', 'tiozao', 'cotidiano', 'familia', 'escola_trabalho', 'absurdo'];
    const CATEGORY_ICONS = {
      trocadilhos: '🤹',
      tiozao: '🧢',
      cotidiano: '🏠',
      familia: '💬',
      escola_trabalho: '📚',
      absurdo: '🤪'
    };
    const DEFAULT_CORRECT_POINTS = 10;
    const DEFAULT_WRONG_PENALTY_POINTS = 0;
    const CORE_PACK_ID = 'core-default';
    const WORD_PACK_SCHEMA = 'naopoderir.jokepack.v1';
    const PACK_SIGNATURE_ALGORITHM = 'ECDSA_P256_SHA256';
    const PACK_SIGNATURE_CONTEXT = 'naopoderir-joke-pack:v1';
    // The app validates purchased packs with a public key only. Keep the
    // matching private key outside this repository and use it only internally.
    const PACK_SIGNING_PUBLIC_KEY = {
      kty: 'EC',
      crv: 'P-256',
      x: 'FJe_7l8WYaFoxOoUr6pQcUkCJtq0yF10kDEqIyLHbqg',
      y: 'u9aaOBq0dS-14a_64f5LDo_NNIL9CwNYzSH9xlKkTX0',
      ext: true
    };
    const KO_FI_WIDGET_SCRIPT_URL = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    const KO_FI_SLUG = 'insightxlabgamestudio';
    const APP_PUBLIC_URL = 'https://insight-x-lab-technologies.github.io/NaoPodeRir/';
    const SOCIAL_WEB_FALLBACKS = {
      instagram: 'https://www.instagram.com/',
      tiktok: 'https://www.tiktok.com/'
    };
    const DONATION_LINKS = {
      buyMeCoffee: 'https://buymeacoffee.com/insight.x.lab.game.studio',
      koFi: `https://ko-fi.com/${KO_FI_SLUG}`
    };
    let currentLanguage = DEFAULT_LANGUAGE;

    function clone(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function generateUserId() {
      if (crypto?.randomUUID) return `npru_${crypto.randomUUID()}`;
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return `npru_${Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')}`;
    }

    function getOrCreateUserId() {
      const saved = localStorage.getItem(USER_ID_KEY);
      if (saved) return saved;
      const nextUserId = generateUserId();
      localStorage.setItem(USER_ID_KEY, nextUserId);
      return nextUserId;
    }

    let appUserId = getOrCreateUserId();

    function getNestedValue(obj, path) {
      return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    }

    const TRANSLATIONS = {
      pt: {
        meta: { documentTitle: 'Não Pode Rir' },
        common: {
          back: '← Voltar',
          add: '+ Adicionar',
          copy: 'Copiar',
          continue: '▶️ Continuar',
          restart: '🔄 Reiniciar',
          home: '🏠 Início',
          pointsShort: 'pts',
          playerSingular: 'jogador',
          playerPlural: 'jogadores',
          roundSingular: 'rodada',
          roundPlural: 'rodadas'
        },
        language: {
          pt: 'Português',
          en: 'English',
          es: 'Español',
          fr: 'Français',
          de: 'Deutsch',
          it: 'Italiano'
        },
        dev: {
          mode: 'Modo de desenvolvimento',
          description: 'Teste rapidamente o layout em mobile, tablet e desktop.',
          previewLabel: 'Prévia de layout',
          preview: {
            auto: 'Auto',
            mobile: 'Mobile',
            tablet: 'Tablet',
            desktop: 'Desktop'
          }
        },
        home: {
          title: 'Não Pode Rir',
          subtitle: 'Leia piadas, segure o riso e vença a rodada',
          enterFullscreen: 'Tela cheia',
          exitFullscreen: 'Sair da tela cheia',
          newGame: '🎮 Nova Partida',
          multiDeviceGame: '📡 Conectar Dispositivos',
          multiDeviceOnline: 'On-line',
          multiDeviceOffline: 'Off-line',
          multiDeviceSummary: ({ status, count }) => `${status} | ${count} device${count !== 1 ? 's' : ''} conectado${count !== 1 ? 's' : ''}`,
          quickGame: '⚡ Jogo Rápido',
          wordBank: '🧩 Conteúdo e Expansões',
          donate: '❤️ Doar',
          settings: '⚙️ Configurações',
          leaderboard: '🏅 Placar Histórico',
          installOnDevice: '📲 Instalar no dispositivo',
          howToTitle: '🏆 Como jogar',
          howTo: {
            setupTitle: 'Monte a partida',
            setupDesc: 'Escolha entre times ou todos contra todos, defina rodadas e categorias de piadas.',
            turnTitle: 'Leia e teste o outro lado',
            turnDesc: 'Uma pessoa recebe a piada e lê em voz alta enquanto a outra tenta não rir.',
            timerTitle: 'Corra contra o tempo',
            timerDesc: 'Os cronômetros de preparação e leitura mantêm cada rodada rápida e divertida.',
            winTitle: 'Faça rir e pontue',
            winDesc: 'Se o outro lado rir, quem leu a piada ganha pontos. No fim, o placar decide o vencedor.'
          }
        },
        multiDevice: {
          title: 'Partida Multi Device',
          chooseTitle: 'O que você quer fazer?',
          chooseDesc: 'Abra uma sessão para controlar a partida ou conecte este device como tela auxiliar.',
          chooseHost: '📡 Abrir uma sessão',
          chooseJoin: '🔗 Conectar em uma sessão',
          changeChoice: 'Trocar opção',
          hostTitle: '📡 Abrir sessão',
          hostDesc: 'Este dispositivo controla a partida. O dispositivo auxiliar alterna entre timer e piada durante a rodada.',
          openSession: 'Abrir sessão',
          hostCreating: 'Criando sessão...',
          hostReady: 'Sessão aberta. Escaneie o QR Code no dispositivo auxiliar.',
          hostError: 'Não foi possível abrir a sessão.',
          sessionCode: 'Código da sessão:',
          guestsConnected: ({ count }) => `${count} device${count !== 1 ? 's' : ''} conectado${count !== 1 ? 's' : ''}`,
          online: 'On-line',
          offline: 'Off-line',
          continueSetup: 'Continuar configuração',
          joinTitle: '🔗 Conectar',
          joinDesc: 'Entre como tela auxiliar para acompanhar a partida do host.',
          joinCodeLabel: 'Código ou link da sessão',
          joinCodePlaceholder: 'Cole o código ou link',
          joinSession: 'Conectar na sessão',
          joinHelp: 'Você também pode escanear o QR Code exibido no host.',
          waitingTitle: 'Aguardando dados da partida',
          guestLabel: 'Tela auxiliar',
          connecting: 'Conectando...',
          connected: 'Conectado',
          disconnected: 'Desconectado',
          guestWaiting: 'Aguardando o host iniciar a partida.',
          guestPreparing: 'Aguardando o host preparar a rodada.',
          guestMemorizing: 'Prepare-se! A piada aparece em instantes.',
          guestPlaying: 'Segurem o riso!',
          guestJokeTurn: 'Sua vez de ler na tela auxiliar.',
          guestScore: 'Aguardando o próximo turno.',
          guestFinal: 'Partida finalizada.',
          reconnecting: 'Reconectando...',
          reconnect: 'Reconectar',
          liveDrawing: '📜 Piada na tela auxiliar',
          assignmentTitle: 'Tela auxiliar',
          assignmentLabel: 'Quem usa a tela auxiliar',
          assignmentSub: 'Escolha o time ou jogador que vai ler usando o dispositivo conectado.',
          disconnect: 'Desconectar',
          linkCopied: '🔗 Link da sessão copiado!',
          missingSession: 'Informe o código da sessão.',
          peerUnavailable: 'PeerJS não carregou. Verifique a conexão e tente novamente.',
          qrUnavailable: 'QR Code indisponível. Use o link ou código da sessão.'
        },
        setup: {
          title: 'Nova Partida',
          gameTypeTitle: '1️⃣ Apresentação da Piada',
          gameTypeMimeName: 'Leitura Local',
          gameTypeMimeDesc: 'A piada aparece no dispositivo principal',
          gameTypeDrawingName: 'Leitura Auxiliar',
          gameTypeDrawingDesc: 'Base para leitura no dispositivo conectado',
          modeTitle: '1️⃣ Modo de Jogo',
          modeTeamsName: 'Dois Times',
          modeTeamsDesc: 'Equipes competem',
          modeFfaName: '1 x 1',
          modeFfaDesc: 'Sem times',
          teamPlayersTitle: '2️⃣ Jogadores por Time',
          playersTitle: '2️⃣ Jogadores',
          teamAPlaceholder: 'Nome do Time A',
          teamBPlaceholder: 'Nome do Time B',
          playerNamePlaceholder: 'Nome do jogador...',
          teamHelper: '💡 Mínimo 1 por time, máximo 3 por time (até 6 jogadores)',
          ffaHelper: '💡 Exatamente 2 jogadores',
          difficultyTitle: '4️⃣ Dificuldade',
          difficultyEasyDesc: 'Ótimo para crianças e iniciantes',
          difficultyNormalDesc: 'Desafio equilibrado para a família',
          difficultyHardDesc: 'Palavras complexas, para os corajosos!',
          optionsTitle: '3️⃣ Opções de Jogo',
          randomChallengeLabel: 'Desafio de Leitura',
          randomChallengeSub: 'Sorteia uma forma divertida de ler a piada',
          randomChallengeDisabledSub: 'Indisponível neste formato',
          categoriesLabel: 'Categorias de Piadas',
          coreCategoriesLabel: 'Categorias Core',
          premiumCategoriesLabel: 'Categorias Extras',
          matchTitle: '4️⃣ Configurar Partida',
          roundsLabel: 'Número de Rodadas',
          roundsSub: 'Quantas rodadas por jogador',
          startGame: '🎤 Começar Rodada!'
        },
        difficulty: {
          easy: 'Fácil',
          normal: 'Normal',
          hard: 'Difícil'
        },
        category: {
          trocadilhos: { plural: 'Trocadilhos', singular: 'Trocadilho', tab: '🤹 Trocadilhos', option: '🤹 Trocadilhos' },
          tiozao: { plural: 'Piadas de Tiozão', singular: 'Piada de Tiozão', tab: '🧢 Tiozão', option: '🧢 Tiozão' },
          cotidiano: { plural: 'Cotidiano', singular: 'Cotidiano', tab: '🏠 Cotidiano', option: '🏠 Cotidiano' },
          familia: { plural: 'Família e Relacionamentos', singular: 'Família e Relacionamentos', tab: '💬 Família', option: '💬 Família' },
          escola_trabalho: { plural: 'Escola e Trabalho', singular: 'Escola e Trabalho', tab: '📚 Escola & Trabalho', option: '📚 Escola & Trabalho' },
          absurdo: { plural: 'Absurdo Surreal', singular: 'Absurdo Surreal', tab: '🤪 Absurdo', option: '🤪 Absurdo' }
        },
        game: {
          currentPlayerLabel: 'Vez de ler a piada:',
          currentPlayerDrawingLabel: 'Vez de ler no dispositivo auxiliar:',
          readyTitle: 'Prontos para receber a piada?',
          readyDrawingTitle: 'Prontos para enviar a piada ao dispositivo auxiliar?',
          readySub: 'Só quem vai ler deve olhar! Os outros fechem os olhos! 👀',
          readyDrawingSub: 'Só quem vai ler no device auxiliar deve olhar! Os outros fechem os olhos! 👀',
          revealWord: '🎲 Sortear Piada',
          memorizeTitle: '⚡ Prepare-se!',
          startsIn: 'A piada aparece em...',
          onlyMimeCanSee: 'Só quem vai ler pode ver!',
          onlyDrawerCanSee: 'Só o leitor do device auxiliar pode ver!',
          secondsLabel: 'SEGUNDOS',
          hiddenWord: 'Piada oculta',
          hintTitle: '🏷️ Categoria',
          showWord: '👁️ Mostrar piada',
          hideWord: '🙈 Ocultar piada',
          wordOnCompanion: 'Piada exibida na tela auxiliar',
          correct: '😂 Riram!',
          wrong: '😐 Ninguém riu',
          challengePrefix: '🎯 Leitura:'
        },
        drawing: {
          canvasLabel: 'Área de desenho',
          toolbarLabel: 'Ferramentas de desenho',
          penThick: 'Linha grossa',
          penThin: 'Linha fina',
          eraserThick: 'Borracha grossa',
          eraserThin: 'Borracha fina',
          clear: 'Limpar canvas'
        },
        result: {
          correctTitle: 'Riram!',
          wrongTitle: 'Seguraram o riso!',
          timeUpTitle: 'Tempo encerrado!',
          nextTurn: '➡️ Próximo turno'
        },
        scoreManager: {
          manageButton: '⚖️ Gerenciar',
          title: 'Gerenciar placar',
          backToGame: '← Voltar ao jogo',
          currentScoreTitle: 'Placar atual',
          resetInputs: '↺ Recarregar',
          saveAndReturn: 'Salvar e voltar'
        },
        score: {
          title: '🏆 Placar',
          nextRoundTitle: '🎊 Próxima Rodada'
        },
        final: {
          winnerLabel: 'VENCEDOR!',
          resultTitle: '📊 Resultado Final',
          playAgain: '🎮 Jogar de Novo',
          tie: 'EMPATE!'
        },
        leaderboard: {
          title: 'Placar Histórico',
          subtitle: 'Ranking dos melhores jogadores de Não Pode Rir em todas as partidas registradas.',
          sortLabel: 'Ordenar por',
          sortSub: 'Compare pontuação total, partidas ou modos específicos.',
          resetButton: 'Apagar resultados',
          listTitle: 'Jogadores',
          emptyState: 'Nenhum resultado registrado ainda.',
          pointsLabel: 'pontos',
          matchesLabel: 'partidas',
          summaryLabel: 'Resultados salvos',
          playerFallbackTitle: 'Novo desafiante',
          tab: {
            overall: 'Ranking geral',
            mime: 'Leitura Local',
            drawing: 'Leitura Auxiliar'
          },
          filter: {
            gameType: 'Tipo de jogo',
            gameMode: 'Modo de jogo',
            allTypes: 'Todos os tipos',
            allTypesSub: 'Ranking geral',
            mimeSub: 'Piada no dispositivo principal',
            drawingSub: 'Piada no dispositivo auxiliar',
            allModes: 'Todos os modos',
            allModesSub: 'Todas as partidas',
            teamsSub: 'Equipes competem',
            ffaSub: 'Sem times'
          },
          sort: {
            total: 'Total de pontos',
            matches: 'Partidas',
            mimeTeams: 'Leitura Local · Times',
            mimeFfa: 'Leitura Local · 1 x 1',
            drawingTeams: 'Leitura Auxiliar · Times',
            drawingFfa: 'Leitura Auxiliar · 1 x 1',
            name: 'Nome'
          },
          mode: {
            mimeTeams: 'Leitura Local · Times',
            mimeFfa: 'Leitura Local · 1 x 1',
            drawingTeams: 'Leitura Auxiliar · Times',
            drawingFfa: 'Leitura Auxiliar · 1 x 1'
          }
        },
        wordbank: {
          title: 'Conteúdo e Expansões',
          addTitle: '➕ Adicionar Piada',
          newWordPlaceholder: 'Digite a piada...',
          addCategoryHint: 'Ela será adicionada à categoria selecionada.',
          addButton: '➕ Adicionar Piada',
          listTitle: '📋 Piadas',
          resetButton: '↺ Restaurar',
          challengesTitle: '🎯 Desafios de Leitura',
          addChallengeTitle: '🎯 Adicionar Desafio de Leitura',
          newChallengePlaceholder: 'Digite o desafio de leitura...',
          addChallengeButton: '➕ Adicionar Desafio',
          installPackTitle: '📦 Instalar pack',
          installPackSub: 'Envie o arquivo .json comprado para liberar novas piadas neste dispositivo.',
          selectPackFile: '📁 Escolher arquivo',
          installedPacksTitle: 'Packs instalados',
          noInstalledPacks: 'Nenhum pack extra instalado ainda.',
          packEnabled: 'Ativo',
          packDisabled: 'Inativo',
          removePack: 'Remover',
          packPreviewTitle: '⭐ Conteúdo do pack',
          packPreviewPrompt: 'Clique em um pack instalado para ver piadas e desafios de leitura.',
          packPreviewWordsTitle: 'Piadas do pack',
          packPreviewChallengesTitle: 'Desafios de leitura do pack',
          packPreviewNoWords: 'Nenhuma piada neste idioma.',
          packPreviewNoChallenges: 'Nenhum desafio de leitura neste idioma.',
          packPreviewSelected: ({ name }) => `Exibindo: ${name}`
        },
        settings: {
          title: 'Configurações',
          timerTitle: '⏱️ Timer',
          roundTimeLabel: 'Tempo por Rodada',
          roundTimeSub: 'Segundos para ler a piada',
          prepareTimeLabel: 'Tempo de Preparação',
          prepareTimeSub: 'Segundos antes da piada aparecer',
          penaltyLabel: 'Penalidade por Skip',
          penaltySub: '−10 pontos ao pular',
          correctPointsLabel: 'Pontos por risada',
          correctPointsSub: 'Pontos para quem faz o outro lado rir',
          wrongPenaltyPointsLabel: 'Pontos perdidos por não rir',
          wrongPenaltyPointsSub: 'Desconta pontos quando ninguém ri ou o tempo acaba',
          roundFlowLabel: 'Fluxo da rodada',
          roundFlowSub: 'Preparação curta, piada sempre visível e marcação rápida de riso',
          generalTitle: '⚙️ Configurações Gerais',
          languageLabel: 'Idioma',
          languageSub: 'Altera a interface e o conteúdo disponível no jogo',
          alertSoundLabel: 'Som de Alerta',
          alertSoundSub: 'Beep nos últimos 10 segundos',
          navigationSoundLabel: 'Som de Navegação',
          navigationSoundSub: 'Som ao clicar nos botões da interface',
          gameroomMusicLabel: 'Música dos menus',
          gameroomMusicSub: 'Toca na página inicial, setup e configurações',
          gameplayMusicLabel: 'Música do gameplay',
          gameplayMusicSub: 'Toca durante preparação, timer e placares',
          userIdTitle: '🪪 ID de compra',
          userIdLabel: 'Seu user_id',
          userIdSub: 'Use este código na compra de packs para que o arquivo seja emitido para este dispositivo.',
          copyUserId: 'Copiar',
          userIdBackupSub: 'Exporte um backup para restaurar este user_id depois de trocar de navegador ou restaurar a aplicação.',
          exportUserIdButton: 'Exportar user_id',
          importUserIdButton: 'Importar user_id',
          wordsTitle: '🎲 Piadas',
          shuffleWordsLabel: 'Embaralhar Piadas',
          shuffleWordsSub: 'Ordem aleatória a cada partida',
          appearanceTitle: '🎨 Aparência',
          themeLabel: 'Tema visual',
          themeSub: 'Troque cores, transparências e tipografia da interface',
          resetAllTitle: '🧹 Restaurar aplicação',
          resetAllSub: 'Remove configurações, jogadores salvos, packs instalados e o user_id deste dispositivo.',
          resetAllButton: 'Restaurar tudo'
        },
        donate: {
          title: 'Apoie Não Pode Rir',
          chooseTitle: '❤️ Escolha como doar',
          subtitle: 'Selecione sua plataforma preferida para apoiar o jogo e ajudar a financiar novos packs de piadas, idiomas e melhorias.',
          buyMeCoffee: 'Buy Me a Coffee',
          buyMeCoffeeSub: 'Apoio rápido e direto com uma doação avulsa.',
          koFi: 'Ko-fi',
          koFiSub: 'Doe via Ko-fi e ajude o projeto a continuar crescendo.',
          whyTitle: '🎭 Por que doar?',
          whyLanguages: 'Seu apoio ajuda a financiar novos idiomas, packs de piadas e futuras expansões de conteúdo.',
          whyUpdates: 'Também ajuda a manter Não Pode Rir atualizado com polimento, balanceamento e novos recursos.'
        },
        share: {
          title: 'Não Pode Rir',
          text: 'Vem jogar Não Pode Rir comigo!',
          footerAriaLabel: 'Compartilhar Não Pode Rir'
        },
        theme: {
          cosmic: 'Cósmico',
          'liquid-glass': 'Outono',
          material3: 'Primavera',
          'light-mode': 'Modo Claro',
          'dark-mode': 'Modo Escuro',
          'high-contrast': 'Alto Contraste'
        },
        footer: {
          copyPrefix: '© 2025 Não Pode Rir v0.1 · Insight X Lab Technologies'
        },
        teams: {
          defaultA: 'Time A',
          defaultB: 'Time B'
        },
        players: {
          defaultName: 'Jogador {number}'
        },
        dynamic: {
          roundDisplay: ({ current, total }) => `Rodada ${current} de ${total}`,
          diffCount: ({ count }) => `${count} piadas disponíveis nas categorias selecionadas`,
          correctTeamPoints: ({ teamName, points }) => `+${points} pontos para ${teamName}!`,
          correctPlayerPoints: ({ playerName, points }) => `+${points} pontos para ${playerName}!`,
          guesserPoints: ({ playerName, points }) => `+${points} pontos para quem acertou: ${playerName}!`,
          correctWithGuesserPoints: ({ actorName, actorPoints, guesserName, guesserPoints }) => `+${actorPoints} para ${actorName} · +${guesserPoints} para ${guesserName}`,
          chooseGuesserPoints: ({ points }) => `Selecione quem acertou para ganhar +${points} pontos.`,
          penaltySkip: ({ points }) => `-${points} pontos (erro/skip)`,
          penaltyApplied: ({ playerName, points }) => `-${points} pontos para ${playerName}.`,
          timeUpPenalty: ({ playerName, points }) => `Tempo esgotado. -${points} pontos para ${playerName}.`,
          timeUpNoPoints: 'O tempo acabou! Sem pontos.',
          skippedNoPoints: 'Palavra pulada. Sem pontos.',
          scoreManagerContext: ({ round, total, playerName }) => `Rodada ${round} de ${total} · Vez de ${playerName}`,
          leaderboardSummary: ({ players, matches }) => `${players} jogador${players !== 1 ? 'es' : ''} · ${matches} partida${matches !== 1 ? 's' : ''}`,
          leaderboardModeStats: ({ points, matches }) => `${points} pts · ${matches} partida${matches !== 1 ? 's' : ''}`,
          leaderboardFooter: ({ shown, total }) => `Mostrando top ${shown} de ${total} jogador${total !== 1 ? 'es' : ''}`,
          roundSummary: ({ roundDone, remaining }) => `Fim da Rodada ${roundDone} — ${remaining} rodada${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}!`,
          wordAdded: ({ word, category }) => `✅ Piada adicionada em ${category}: "${word}"`,
          teamAdded: ({ name, teamName }) => `✅ ${name} em ${teamName}!`,
          playerAdded: ({ name }) => `✅ ${name} entrou!`,
          packInstalled: ({ name }) => `✅ Pack "${name}" instalado!`,
          packWordsSummary: ({ count }) => `${count} piada${count !== 1 ? 's' : ''}`,
          packVersion: ({ version }) => `v${version}`,
          challengeAdded: ({ challenge }) => `✅ Desafio de leitura "${challenge}" adicionado!`
        },
        notifications: {
          duplicateWord: '⚠️ Piada já existe!',
          duplicateChallenge: '⚠️ Desafio já existe!',
          bankRestored: '✅ Banco de piadas restaurado!',
          challengeRemoved: 'Desafio de leitura removido.',
          challengesRestored: '✅ Desafios restaurados!',
          leaderboardReset: '✅ Placar histórico apagado!',
          userIdCopied: '🪪 user_id copiado!',
          userIdExported: '🪪 Backup do user_id exportado!',
          userIdImported: '🪪 user_id restaurado!',
          userIdImportCancelled: 'Importação cancelada.',
          packInstallReading: 'Lendo arquivo...',
          packInstallSuccess: '✅ Pack instalado e ativado!',
          packInstallCancelled: 'Instalação cancelada.',
          packRemoved: 'Pack removido.',
          packToggled: 'Status do pack atualizado.',
          maxPlayers: '❌ Máximo 6 jogadores!',
          maxTeamPlayers: '❌ Máximo 3 por time!',
          minTeamPlayers: '❌ Mínimo 1 por time!',
          minFfaPlayers: '❌ O modo 1 x 1 precisa de exatamente 2 jogadores!',
          maxFfaPlayers: '❌ O modo 1 x 1 aceita no máximo 2 jogadores!',
          donationLinkUnavailable: '⚠️ Configure o link de doação deste parceiro para ativá-lo.',
          shareCopied: '🔗 Link copiado!',
          shareUnavailable: '🔗 Link copiado para compartilhar.',
          shareCopyFailed: '⚠️ Não foi possível copiar o link.',
          shareInstagramFallback: '🔗 Link copiado. Cole no Instagram.',
          shareTikTokFallback: '🔗 Link copiado. Cole no TikTok.',
          fullscreenUnavailable: '⚠️ Tela cheia indisponível neste navegador.'
        },
        confirmations: {
          resetWords: 'Restaurar o banco de palavras padrão? Palavras customizadas serão perdidas.',
          resetChallenges: 'Restaurar os desafios padrão? Desafios customizados serão perdidos.',
          resetLeaderboard: 'Apagar todos os resultados do placar histórico?',
          resetAppDefaults: 'Restaurar toda a aplicação para o padrão? Configurações, jogadores salvos, packs instalados e user_id serão apagados.',
          replaceUserId: ({ currentUserId, importedUserId }) => `Substituir o user_id atual (${currentUserId}) pelo user_id importado (${importedUserId})? Use isso apenas para restaurar compras já emitidas para esse ID.`,
          restartGame: 'Reiniciar o jogo? Todo o progresso será perdido.',
          replacePack: ({ packName }) => `Já existe um pack instalado com este ID (${packName}). Substituir?`,
          removePack: ({ packName }) => `Remover o pack "${packName}" deste dispositivo?`
        },
        packErrors: {
          fileRequired: 'Selecione um arquivo de pack.',
          invalidJson: 'Arquivo inválido. Envie um JSON de pack.',
          invalidSchema: 'Schema do pack inválido.',
          invalidUser: 'Este pack foi emitido para outro user_id.',
          invalidPackId: 'pack_id ausente ou inválido.',
          invalidAlgorithm: 'Algoritmo de assinatura inválido.',
          invalidSignature: 'Assinatura inválida. O pack não foi instalado.',
          invalidContentHash: 'Hash do conteúdo inválido.',
          emptyPack: 'O pack não possui palavras ou desafios válidos.',
          cryptoUnavailable: 'Este navegador não suporta validação segura de packs.',
          reservedPackId: 'Este pack_id é reservado pelo jogo.'
        },
        userIdErrors: {
          fileRequired: 'Selecione um arquivo de user_id.',
          invalidJson: 'Arquivo inválido. Envie um JSON de user_id.',
          invalidSchema: 'Este arquivo não é um backup de user_id do Não Pode Rir.',
          invalidUserId: 'O user_id do arquivo é inválido.'
        }
      },
      en: {
        meta: { documentTitle: 'No Laughing Allowed' },
        common: {
          back: '← Back',
          add: '+ Add',
          copy: 'Copy',
          continue: '▶️ Continue',
          restart: '🔄 Restart',
          home: '🏠 Home',
          pointsShort: 'pts',
          playerSingular: 'player',
          playerPlural: 'players',
          roundSingular: 'round',
          roundPlural: 'rounds'
        },
        language: {
          pt: 'Portuguese',
          en: 'English',
          es: 'Spanish',
          fr: 'French',
          de: 'German',
          it: 'Italian'
        },
        dev: {
          mode: 'Development mode',
          description: 'Quickly preview the layout on mobile, tablet, and desktop.',
          previewLabel: 'Layout preview',
          preview: {
            auto: 'Auto',
            mobile: 'Mobile',
            tablet: 'Tablet',
            desktop: 'Desktop'
          }
        },
        home: {
          title: 'No Laughing Allowed',
          subtitle: 'Read jokes, hold your laugh, and win the round',
          enterFullscreen: 'Full screen',
          exitFullscreen: 'Exit full screen',
          newGame: '🎮 New Game',
          multiDeviceGame: '📡 Connect Devices',
          multiDeviceOnline: 'Online',
          multiDeviceOffline: 'Offline',
          multiDeviceSummary: ({ status, count }) => `${status} | ${count} device${count !== 1 ? 's' : ''} connected`,
          quickGame: '⚡ Quick Game',
          wordBank: '🧩 Content & Expansions',
          donate: '❤️ Donate',
          settings: '⚙️ Settings',
          leaderboard: '🏅 Leaderboard',
          installOnDevice: '📲 Install on Device',
          howToTitle: '🏆 How to play',
          howTo: {
            setupTitle: 'Set up the match',
            setupDesc: 'Choose teams or free for all, then set rounds, difficulty, and categories.',
            turnTitle: 'See it and act it out',
            turnDesc: 'One player sees the word, memorizes it, then acts or draws while everyone else guesses.',
            timerTitle: 'Race against the clock',
            timerDesc: 'The timer, hints, and alert sounds keep every turn fast, clear, and fun.',
            winTitle: 'Score and win',
            winDesc: 'Each correct answer is worth 10 points. At the end of the rounds, the scoreboard decides the winner.'
          }
        },
        multiDevice: {
          title: 'Multi Device Game',
          chooseTitle: 'What do you want to do?',
          chooseDesc: 'Open a session to control the game or connect this device as a companion screen.',
          chooseHost: '📡 Open a session',
          chooseJoin: '🔗 Join a session',
          changeChoice: 'Change option',
          hostTitle: '📡 Open session',
          hostDesc: 'This device controls the game. The companion screen alternates between the timer and the joke during each round.',
          openSession: 'Open session',
          hostCreating: 'Creating session...',
          hostReady: 'Session open. Scan the QR Code on the companion device.',
          hostError: 'Could not open the session.',
          sessionCode: 'Session code:',
          guestsConnected: ({ count }) => `${count} device${count !== 1 ? 's' : ''} connected`,
          online: 'Online',
          offline: 'Offline',
          continueSetup: 'Continue setup',
          joinTitle: '🔗 Join',
          joinDesc: 'Join as a companion screen to follow the host game.',
          joinCodeLabel: 'Session code or link',
          joinCodePlaceholder: 'Paste the code or link',
          joinSession: 'Join session',
          joinHelp: 'You can also scan the QR Code shown on the host.',
          waitingTitle: 'Waiting for game data',
          guestLabel: 'Companion screen',
          connecting: 'Connecting...',
          connected: 'Connected',
          disconnected: 'Disconnected',
          guestWaiting: 'Waiting for the host to start the game.',
          guestPreparing: 'Waiting for the host to prepare the round.',
          guestMemorizing: 'Get ready! The joke will appear in a moment.',
          guestPlaying: 'Keep a straight face!',
          guestJokeTurn: 'Your turn to read on the companion screen.',
          guestScore: 'Waiting for the next turn.',
          guestFinal: 'Game finished.',
          reconnecting: 'Reconnecting...',
          reconnect: 'Reconnect',
          liveDrawing: '📜 Joke on the companion screen',
          assignmentTitle: 'Companion screen',
          assignmentLabel: 'Who uses the companion screen',
          assignmentSub: 'Choose the team or player who will read using the connected device.',
          disconnect: 'Disconnect',
          linkCopied: '🔗 Session link copied!',
          missingSession: 'Enter the session code.',
          peerUnavailable: 'PeerJS did not load. Check the connection and try again.',
          qrUnavailable: 'QR Code unavailable. Use the session link or code.'
        },
        setup: {
          title: 'New Game',
          gameTypeTitle: '1️⃣ Joke Presentation',
          gameTypeMimeName: 'Local Reading',
          gameTypeMimeDesc: 'The joke appears on the main device',
          gameTypeDrawingName: 'Companion Reading',
          gameTypeDrawingDesc: 'Base mode for the connected-device flow',
          modeTitle: '1️⃣ Game Mode',
          modeTeamsName: 'Two Teams',
          modeTeamsDesc: 'Teams compete',
          modeFfaName: '1 vs 1',
          modeFfaDesc: 'No teams',
          teamPlayersTitle: '2️⃣ Players per Team',
          playersTitle: '2️⃣ Players',
          teamAPlaceholder: 'Team A name',
          teamBPlaceholder: 'Team B name',
          playerNamePlaceholder: 'Player name...',
          teamHelper: '💡 Minimum 1 per team, maximum 3 per team (up to 6 players)',
          ffaHelper: '💡 Exactly 2 players',
          difficultyTitle: '4️⃣ Difficulty',
          difficultyEasyDesc: 'Great for kids and beginners',
          difficultyNormalDesc: 'Balanced fun for the whole family',
          difficultyHardDesc: 'Complex words for the brave!',
          optionsTitle: '3️⃣ Game Options',
          randomChallengeLabel: 'Reading Challenge',
          randomChallengeSub: 'Adds a fun way to read the joke',
          randomChallengeDisabledSub: 'Unavailable in this presentation mode',
          categoriesLabel: 'Joke Categories',
          coreCategoriesLabel: 'Core Categories',
          premiumCategoriesLabel: 'Extra Categories',
          matchTitle: '4️⃣ Match Setup',
          roundsLabel: 'Number of Rounds',
          roundsSub: 'How many rounds per player',
          startGame: '🎤 Start Round!'
        },
        difficulty: {
          easy: 'Easy',
          normal: 'Normal',
          hard: 'Hard'
        },
        category: {
          trocadilhos: { plural: 'Puns', singular: 'Pun', tab: '🤹 Puns', option: '🤹 Puns' },
          tiozao: { plural: 'Dad Jokes', singular: 'Dad Joke', tab: '🧢 Dad Jokes', option: '🧢 Dad Jokes' },
          cotidiano: { plural: 'Everyday Life', singular: 'Everyday Life', tab: '🏠 Everyday', option: '🏠 Everyday' },
          familia: { plural: 'Family & Relationships', singular: 'Family & Relationships', tab: '💬 Family', option: '💬 Family' },
          escola_trabalho: { plural: 'School & Work', singular: 'School & Work', tab: '📚 School & Work', option: '📚 School & Work' },
          absurdo: { plural: 'Surreal Absurd', singular: 'Surreal Absurd', tab: '🤪 Absurd', option: '🤪 Absurd' }
        },
        game: {
          currentPlayerLabel: 'Current joke reader:',
          currentPlayerDrawingLabel: 'Current companion reader:',
          readyTitle: 'Ready to receive the joke?',
          readyDrawingTitle: 'Ready to send the joke to the companion device?',
          readySub: 'Only the reader should look! Everyone else close your eyes! 👀',
          readyDrawingSub: 'Only the companion reader should look! Everyone else close your eyes! 👀',
          revealWord: '🎲 Draw Joke',
          memorizeTitle: '⚡ Get ready!',
          startsIn: 'The joke appears in...',
          onlyMimeCanSee: 'Only the reader can see it!',
          onlyDrawerCanSee: 'Only the companion reader can see it!',
          secondsLabel: 'SECONDS',
          hiddenWord: 'Hidden joke',
          hintTitle: '🏷️ Category',
          showWord: '👁️ Show joke',
          hideWord: '🙈 Hide joke',
          wordOnCompanion: 'Joke shown on the companion screen',
          correct: '😂 They laughed!',
          wrong: '😐 No laughs',
          challengePrefix: '🎯 Reading:'
        },
        drawing: {
          canvasLabel: 'Drawing area',
          toolbarLabel: 'Drawing tools',
          penThick: 'Thick line',
          penThin: 'Thin line',
          eraserThick: 'Thick eraser',
          eraserThin: 'Thin eraser',
          clear: 'Clear canvas'
        },
        result: {
          correctTitle: 'They laughed!',
          wrongTitle: 'No laughs!',
          timeUpTitle: 'Time is up!',
          nextTurn: '➡️ Next turn'
        },
        scoreManager: {
          manageButton: '⚖️ Manage',
          title: 'Manage scoreboard',
          backToGame: '← Back to game',
          currentScoreTitle: 'Current score',
          resetInputs: '↺ Reload',
          saveAndReturn: 'Save and return'
        },
        score: {
          title: '🏆 Scoreboard',
          nextRoundTitle: '🎊 Next Round'
        },
        final: {
          winnerLabel: 'WINNER!',
          resultTitle: '📊 Final Result',
          playAgain: '🎮 Play Again',
          tie: 'TIE!'
        },
        leaderboard: {
          title: 'All Time Leaderboard',
          subtitle: 'Ranking of the best players across every saved match.',
          sortLabel: 'Sort by',
          sortSub: 'Compare total score, matches, or specific game modes.',
          resetButton: 'Clear results',
          listTitle: 'Players',
          emptyState: 'No results recorded yet.',
          pointsLabel: 'points',
          matchesLabel: 'matches',
          summaryLabel: 'Saved results',
          playerFallbackTitle: 'New challenger',
          tab: {
            overall: 'Overall ranking',
            mime: 'Mime',
            drawing: 'Drawing'
          },
          filter: {
            gameType: 'Game type',
            gameMode: 'Game mode',
            allTypes: 'All types',
            allTypesSub: 'Overall ranking',
            mimeSub: 'Act without speaking',
            drawingSub: 'Draw the word',
            allModes: 'All modes',
            allModesSub: 'All matches',
            teamsSub: 'Teams compete',
            ffaSub: 'No teams'
          },
          sort: {
            total: 'Total points',
            matches: 'Matches',
            mimeTeams: 'Mime · Teams',
            mimeFfa: 'Mime · 1 vs 1',
            drawingTeams: 'Drawing · Teams',
            drawingFfa: 'Drawing · 1 vs 1',
            name: 'Name'
          },
          mode: {
            mimeTeams: 'Mime · Teams',
            mimeFfa: 'Mime · 1 vs 1',
            drawingTeams: 'Drawing · Teams',
            drawingFfa: 'Drawing · 1 vs 1'
          }
        },
        wordbank: {
          title: 'Content & Expansions',
          addTitle: '➕ Add Joke',
          newWordPlaceholder: 'Type the joke...',
          addCategoryHint: 'It will be added to the selected category.',
          addButton: '➕ Add Joke',
          listTitle: '📋 Jokes',
          resetButton: '↺ Restore',
          challengesTitle: '🎯 Reading Challenges',
          addChallengeTitle: '🎯 Add Reading Challenge',
          newChallengePlaceholder: 'Type the reading challenge...',
          addChallengeButton: '➕ Add Challenge',
          installPackTitle: '📦 Install pack',
          installPackSub: 'Upload the purchased .json file to unlock new jokes on this device.',
          selectPackFile: '📁 Choose file',
          installedPacksTitle: 'Installed packs',
          noInstalledPacks: 'No extra packs installed yet.',
          packEnabled: 'Enabled',
          packDisabled: 'Disabled',
          removePack: 'Remove',
          packPreviewTitle: '⭐ Pack content',
          packPreviewPrompt: 'Click an installed pack to see jokes and reading challenges.',
          packPreviewWordsTitle: 'Pack jokes',
          packPreviewChallengesTitle: 'Pack reading challenges',
          packPreviewNoWords: 'No jokes in this language.',
          packPreviewNoChallenges: 'No reading challenges in this language.',
          packPreviewSelected: ({ name }) => `Showing: ${name}`
        },
        settings: {
          title: 'Settings',
          timerTitle: '⏱️ Timer',
          roundTimeLabel: 'Round Time',
          roundTimeSub: 'Seconds to read the joke',
          prepareTimeLabel: 'Preparation Time',
          prepareTimeSub: 'Seconds before the joke appears',
          penaltyLabel: 'Skip Penalty',
          penaltySub: '−10 points when skipping',
          correctPointsLabel: 'Points per laugh',
          correctPointsSub: 'Points for the player who makes the other side laugh',
          wrongPenaltyPointsLabel: 'Points lost for not laughing',
          wrongPenaltyPointsSub: 'Subtracts points when nobody laughs or time runs out',
          roundFlowLabel: 'Round flow',
          roundFlowSub: 'Short prep, joke always visible, and a quick laugh/no-laugh decision',
          generalTitle: '⚙️ General Settings',
          languageLabel: 'Language',
          languageSub: 'Changes the interface and the content available in the game',
          alertSoundLabel: 'Alert Sound',
          alertSoundSub: 'Beep during the last 10 seconds',
          navigationSoundLabel: 'Navigation Sound',
          navigationSoundSub: 'Sound when clicking interface buttons',
          gameroomMusicLabel: 'Menu Music',
          gameroomMusicSub: 'Plays on the home, setup, and settings screens',
          gameplayMusicLabel: 'Gameplay Music',
          gameplayMusicSub: 'Plays during preparation, timer, and score screens',
          userIdTitle: '🪪 Purchase ID',
          userIdLabel: 'Your user_id',
          userIdSub: 'Use this code when buying packs so the file is issued to this device.',
          copyUserId: 'Copy',
          userIdBackupSub: 'Export a backup to restore this user_id after switching browsers or resetting the application.',
          exportUserIdButton: 'Export user_id',
          importUserIdButton: 'Import user_id',
          wordsTitle: '🎲 Jokes',
          shuffleWordsLabel: 'Shuffle Jokes',
          shuffleWordsSub: 'Random order every match',
          appearanceTitle: '🎨 Appearance',
          themeLabel: 'Visual theme',
          themeSub: 'Change colors, transparencies, and interface typography',
          resetAllTitle: '🧹 Reset application',
          resetAllSub: 'Removes settings, saved players, installed packs, and this device user_id.',
          resetAllButton: 'Reset everything'
        },
        donate: {
          title: 'Support No Laughing Allowed',
          chooseTitle: '❤️ Choose how to donate',
          subtitle: 'Pick your preferred platform to support the game and help fund new joke packs, languages, and updates.',
          buyMeCoffee: 'Buy Me a Coffee',
          buyMeCoffeeSub: 'Fast one-time support through Buy Me a Coffee.',
          koFi: 'Ko-fi',
          koFiSub: 'Donate with Ko-fi and keep the project growing.',
          whyTitle: '🎭 Why donate?',
          whyLanguages: 'Your support helps fund new languages, joke packs, and future content expansions.',
          whyUpdates: 'It also helps keep No Laughing Allowed maintained with polish, balance tweaks, and new features.'
        },
        share: {
          title: 'No Laughing Allowed',
          text: 'Come play No Laughing Allowed with me!',
          footerAriaLabel: 'Share No Laughing Allowed'
        },
        theme: {
          cosmic: 'Cosmic',
          'liquid-glass': 'Autumn',
          material3: 'Spring',
          'light-mode': 'Light Mode',
          'dark-mode': 'Dark Mode',
          'high-contrast': 'High Contrast'
        },
        footer: {
          copyPrefix: '© 2025 No Laughing Allowed v0.1 · Insight X Lab Technologies'
        },
        teams: {
          defaultA: 'Team A',
          defaultB: 'Team B'
        },
        players: {
          defaultName: 'Player {number}'
        },
        dynamic: {
          roundDisplay: ({ current, total }) => `Round ${current} of ${total}`,
          diffCount: ({ count }) => `${count} jokes available in the selected categories`,
          correctTeamPoints: ({ teamName, points }) => `+${points} points for ${teamName}!`,
          correctPlayerPoints: ({ playerName, points }) => `+${points} points for ${playerName}!`,
          guesserPoints: ({ playerName, points }) => `+${points} points for the guesser: ${playerName}!`,
          correctWithGuesserPoints: ({ actorName, actorPoints, guesserName, guesserPoints }) => `+${actorPoints} for ${actorName} · +${guesserPoints} for ${guesserName}`,
          chooseGuesserPoints: ({ points }) => `Select who guessed it to receive +${points} points.`,
          penaltySkip: ({ points }) => `-${points} points (wrong/skip)`,
          penaltyApplied: ({ playerName, points }) => `-${points} points for ${playerName}.`,
          timeUpPenalty: ({ playerName, points }) => `Time is up. -${points} points for ${playerName}.`,
          timeUpNoPoints: 'Time is up! No points.',
          skippedNoPoints: 'Word skipped. No points.',
          scoreManagerContext: ({ round, total, playerName }) => `Round ${round} of ${total} · ${playerName}'s turn`,
          leaderboardSummary: ({ players, matches }) => `${players} player${players !== 1 ? 's' : ''} · ${matches} match${matches !== 1 ? 'es' : ''}`,
          leaderboardModeStats: ({ points, matches }) => `${points} pts · ${matches} match${matches !== 1 ? 'es' : ''}`,
          leaderboardFooter: ({ shown, total }) => `Showing top ${shown} of ${total} player${total !== 1 ? 's' : ''}`,
          roundSummary: ({ roundDone, remaining }) => `End of Round ${roundDone} — ${remaining} round${remaining !== 1 ? 's' : ''} remaining!`,
          wordAdded: ({ word, category }) => `✅ Joke added to ${category}: "${word}"`,
          teamAdded: ({ name, teamName }) => `✅ ${name} joined ${teamName}!`,
          playerAdded: ({ name }) => `✅ ${name} joined!`,
          packInstalled: ({ name }) => `✅ Pack "${name}" installed!`,
          packWordsSummary: ({ count }) => `${count} joke${count !== 1 ? 's' : ''}`,
          packVersion: ({ version }) => `v${version}`,
          challengeAdded: ({ challenge }) => `✅ Challenge "${challenge}" added!`
        },
        notifications: {
          duplicateWord: '⚠️ Joke already exists!',
          duplicateChallenge: '⚠️ Challenge already exists!',
          bankRestored: '✅ Joke bank restored!',
          challengeRemoved: 'Reading challenge removed.',
          challengesRestored: '✅ Challenges restored!',
          leaderboardReset: '✅ Leaderboard cleared!',
          userIdCopied: '🪪 user_id copied!',
          userIdExported: '🪪 user_id backup exported!',
          userIdImported: '🪪 user_id restored!',
          userIdImportCancelled: 'Import cancelled.',
          packInstallReading: 'Reading file...',
          packInstallSuccess: '✅ Pack installed and enabled!',
          packInstallCancelled: 'Installation cancelled.',
          packRemoved: 'Pack removed.',
          packToggled: 'Pack status updated.',
          maxPlayers: '❌ Maximum 6 players!',
          maxTeamPlayers: '❌ Maximum 3 per team!',
          minTeamPlayers: '❌ At least 1 per team!',
          minFfaPlayers: '❌ 1 vs 1 mode needs exactly 2 players!',
          maxFfaPlayers: '❌ 1 vs 1 mode allows at most 2 players!',
          donationLinkUnavailable: '⚠️ Configure this partner donation link to enable it.',
          shareCopied: '🔗 Link copied!',
          shareUnavailable: '🔗 Link copied for sharing.',
          shareCopyFailed: '⚠️ Could not copy the link.',
          shareInstagramFallback: '🔗 Link copied. Paste it into Instagram.',
          shareTikTokFallback: '🔗 Link copied. Paste it into TikTok.',
          fullscreenUnavailable: '⚠️ Full screen is unavailable in this browser.'
        },
        confirmations: {
          resetWords: 'Restore the default word bank? Custom words will be lost.',
          resetChallenges: 'Restore the default challenges? Custom challenges will be lost.',
          resetLeaderboard: 'Clear all All Time Leaderboard results?',
          resetAppDefaults: 'Reset the entire application to defaults? Settings, saved players, installed packs, and user_id will be erased.',
          replaceUserId: ({ currentUserId, importedUserId }) => `Replace the current user_id (${currentUserId}) with the imported user_id (${importedUserId})? Use this only to restore purchases already issued for that ID.`,
          restartGame: 'Restart the game? All progress will be lost.',
          replacePack: ({ packName }) => `A pack with this ID is already installed (${packName}). Replace it?`,
          removePack: ({ packName }) => `Remove the pack "${packName}" from this device?`
        },
        packErrors: {
          fileRequired: 'Select a pack file.',
          invalidJson: 'Invalid file. Upload a pack JSON.',
          invalidSchema: 'Invalid pack schema.',
          invalidUser: 'This pack was issued to another user_id.',
          invalidPackId: 'Missing or invalid pack_id.',
          invalidAlgorithm: 'Invalid signature algorithm.',
          invalidSignature: 'Invalid signature. The pack was not installed.',
          invalidContentHash: 'Invalid content hash.',
          emptyPack: 'The pack has no valid words or challenges.',
          cryptoUnavailable: 'This browser does not support secure pack validation.',
          reservedPackId: 'This pack_id is reserved by the game.'
        },
        userIdErrors: {
          fileRequired: 'Select a user_id file.',
          invalidJson: 'Invalid file. Upload a user_id JSON.',
          invalidSchema: 'This file is not a No Laughing Allowed user_id backup.',
          invalidUserId: 'The user_id in the file is invalid.'
        }
      },
      es: {
        meta: { documentTitle: 'Desafío de Mímica' },
        common: {
          back: '← Volver',
          add: '+ Añadir',
          copy: 'Copiar',
          continue: '▶️ Continuar',
          restart: '🔄 Reiniciar',
          home: '🏠 Inicio',
          pointsShort: 'pts',
          playerSingular: 'jugador',
          playerPlural: 'jugadores',
          roundSingular: 'ronda',
          roundPlural: 'rondas'
        },
        language: {
          pt: 'Portugués',
          en: 'Inglés',
          es: 'Español',
          fr: 'Francés',
          de: 'Alemán',
          it: 'Italiano'
        },
        dev: {
          mode: 'Modo de desarrollo',
          description: 'Prueba rápidamente el diseño en móvil, tableta y escritorio.',
          previewLabel: 'Vista del diseño',
          preview: {
            auto: 'Auto',
            mobile: 'Móvil',
            tablet: 'Tableta',
            desktop: 'Escritorio'
          }
        },
        home: {
          title: 'Desafío de Mímica',
          subtitle: 'Dibuja, Adivina y Diviértete en Familia',
          enterFullscreen: 'Pantalla completa',
          exitFullscreen: 'Salir de pantalla completa',
          newGame: '🎮 Nueva Partida',
          multiDeviceGame: '📡 Conectar dispositivos',
          multiDeviceOnline: 'En línea',
          multiDeviceOffline: 'Sin conexión',
          multiDeviceSummary: ({ status, count }) => `${status} | ${count} dispositivo${count !== 1 ? 's' : ''} conectado${count !== 1 ? 's' : ''}`,
          quickGame: '⚡ Juego Rápido',
          wordBank: '🧩 Contenido y Expansiones',
          donate: '❤️ Donar',
          settings: '⚙️ Configuración',
          leaderboard: '🏅 Clasificación histórica',
          installOnDevice: '📲 Instalar en el dispositivo',
          howToTitle: '🏆 Cómo jugar',
          howTo: {
            setupTitle: 'Prepara la partida',
            setupDesc: 'Elige entre equipos o todos contra todos y define rondas, dificultad y categorías.',
            turnTitle: 'Mira y representa',
            turnDesc: 'Un jugador ve la palabra, la memoriza y hace mímica o dibuja mientras los demás intentan adivinar.',
            timerTitle: 'Corre contra el tiempo',
            timerDesc: 'El temporizador, las pistas y los sonidos de alerta hacen que cada turno sea rápido y divertido.',
            winTitle: 'Suma puntos y gana',
            winDesc: 'Cada acierto vale 10 puntos. Al final de las rondas, el marcador define al ganador.'
          }
        },
        multiDevice: {
          title: 'Partida Multi Device',
          chooseTitle: '¿Qué quieres hacer?',
          chooseDesc: 'Abre una sesión para controlar la partida o conecta este dispositivo como pantalla auxiliar.',
          chooseHost: '📡 Abrir una sesión',
          chooseJoin: '🔗 Conectar a una sesión',
          changeChoice: 'Cambiar opción',
          hostTitle: '📡 Abrir sesión',
          hostDesc: 'Este dispositivo controla la partida. Los demás entran para ver temporizador, pistas y dibujo.',
          openSession: 'Abrir sesión',
          hostCreating: 'Creando sesión...',
          hostReady: 'Sesión abierta. Escanea el QR Code en los otros dispositivos.',
          hostError: 'No se pudo abrir la sesión.',
          sessionCode: 'Código de sesión:',
          guestsConnected: ({ count }) => `${count} dispositivo${count !== 1 ? 's' : ''} conectado${count !== 1 ? 's' : ''}`,
          online: 'En línea',
          offline: 'Sin conexión',
          continueSetup: 'Continuar configuración',
          joinTitle: '🔗 Conectar',
          joinDesc: 'Entra como pantalla auxiliar para seguir la partida del host.',
          joinCodeLabel: 'Código o enlace de sesión',
          joinCodePlaceholder: 'Pega el código o enlace',
          joinSession: 'Conectar a la sesión',
          joinHelp: 'También puedes escanear el QR Code mostrado en el host.',
          waitingTitle: 'Esperando datos de la partida',
          guestLabel: 'Pantalla auxiliar',
          connecting: 'Conectando...',
          connected: 'Conectado',
          disconnected: 'Desconectado',
          guestWaiting: 'Esperando que el host inicie la partida.',
          guestPreparing: 'Esperando a que el host prepare la ronda.',
          guestMemorizing: '¡Prepárate! El chiste aparecerá enseguida.',
          guestPlaying: '¡Adivinen!',
          guestScore: 'Esperando el próximo turno.',
          guestFinal: 'Partida finalizada.',
          liveDrawing: '✏️ Dibujo en vivo',
          disconnect: 'Desconectar',
          linkCopied: '🔗 ¡Enlace de sesión copiado!',
          missingSession: 'Introduce el código de sesión.',
          peerUnavailable: 'PeerJS no cargó. Revisa la conexión e inténtalo de nuevo.',
          qrUnavailable: 'QR Code no disponible. Usa el enlace o código de sesión.'
        },
        setup: {
          title: 'Nueva Partida',
          gameTypeTitle: '1️⃣ Tipo de Juego',
          gameTypeMimeName: 'Mímica',
          gameTypeMimeDesc: 'Actúa sin hablar',
          gameTypeDrawingName: 'Dibujo',
          gameTypeDrawingDesc: 'Dibuja la palabra',
          modeTitle: '2️⃣ Modo de Juego',
          modeTeamsName: 'Dos Equipos',
          modeTeamsDesc: 'Compiten por equipos',
          modeFfaName: 'Todos contra todos',
          modeFfaDesc: 'Cada quien por su cuenta',
          teamPlayersTitle: '3️⃣ Jugadores por Equipo',
          playersTitle: '2️⃣ Jugadores',
          teamAPlaceholder: 'Nombre del Equipo A',
          teamBPlaceholder: 'Nombre del Equipo B',
          playerNamePlaceholder: 'Nombre del jugador...',
          teamHelper: '💡 Mínimo 1 por equipo, máximo 3 por equipo (hasta 6 jugadores)',
          ffaHelper: '💡 Exactamente 2 jugadores',
          difficultyTitle: '4️⃣ Dificultad',
          difficultyEasyDesc: 'Ideal para niños y principiantes',
          difficultyNormalDesc: 'Desafío equilibrado para la familia',
          difficultyHardDesc: 'Palabras complejas para los valientes',
          optionsTitle: '5️⃣ Opciones de Juego',
          randomChallengeLabel: 'Desafío Aleatorio',
          randomChallengeSub: 'Añade modificadores a la mímica',
          randomChallengeDisabledSub: 'No disponible en modo dibujo',
          categoriesLabel: 'Categorías Disponibles',
          coreCategoriesLabel: 'Categorías Core',
          premiumCategoriesLabel: 'Categorías Premium',
          matchTitle: '6️⃣ Configurar Partida',
          roundsLabel: 'Número de Rondas',
          roundsSub: 'Cuántas rondas por jugador',
          startGame: '🎭 ¡Empezar Juego!'
        },
        difficulty: {
          easy: 'Fácil',
          normal: 'Normal',
          hard: 'Difícil'
        },
        category: {
          objects: { plural: 'Objetos', singular: 'Objeto', tab: '🧸 Objetos', option: '🧸 Objetos' },
          actions: { plural: 'Acciones', singular: 'Acción', tab: '🏃 Acciones', option: '🏃 Acciones' },
          animals: { plural: 'Animales', singular: 'Animal', tab: '🐾 Animales', option: '🐾 Animales' },
          movies: { plural: 'Películas', singular: 'Película', tab: '🎬 Películas', option: '🎬 Películas' },
          professions: { plural: 'Profesiones', singular: 'Profesión', tab: '👔 Profesiones', option: '👔 Profesiones' },
          celebrities: { plural: 'Celebridades', singular: 'Celebridad', tab: '⭐ Celebridades', option: '⭐ Celebridades' }
        },
        game: {
          currentPlayerLabel: 'Turno de hacer la mímica:',
          currentPlayerDrawingLabel: 'Turno de dibujar:',
          readyTitle: '¿Listos para ver la palabra?',
          readyDrawingTitle: '¿Listos para ver qué dibujar?',
          readySub: '¡Solo el mimo debe mirar! ¡Los demás cierren los ojos! 👀',
          readyDrawingSub: '¡Solo quien va a dibujar debe mirar! ¡Los demás cierren los ojos! 👀',
          revealWord: '🎲 Mostrar Palabra',
          memorizeTitle: '⚡ ¡Prepárate!',
          startsIn: 'El chiste aparece en...',
          onlyMimeCanSee: '¡Solo el mimo puede verla!',
          onlyDrawerCanSee: '¡Solo quien dibuja puede verla!',
          secondsLabel: 'SEGUNDOS',
          hiddenWord: 'Palabra oculta',
          hintTitle: '💡 Pista',
          showWord: '👁️ Mostrar palabra',
          hideWord: '🙈 Ocultar palabra',
          correct: '✅ ¡Acertó!',
          wrong: '❌ Error / Skip',
          challengePrefix: '🎯 Desafío:'
        },
        drawing: {
          canvasLabel: 'Área de dibujo',
          toolbarLabel: 'Herramientas de dibujo',
          penThick: 'Línea gruesa',
          penThin: 'Línea fina',
          eraserThick: 'Borrador grueso',
          eraserThin: 'Borrador fino',
          clear: 'Limpiar canvas'
        },
        result: {
          correctTitle: '¡Acertó!',
          wrongTitle: '¡Falló!',
          timeUpTitle: '¡Tiempo agotado!',
          guesserLabel: '¿Quién acertó?',
          guesserPlaceholder: 'Selecciona quién adivinó',
          nextTurn: '➡️ Siguiente turno'
        },
        scoreManager: {
          manageButton: '⚖️ Gestionar',
          title: 'Gestionar marcador',
          backToGame: '← Volver al juego',
          currentScoreTitle: 'Marcador actual',
          resetInputs: '↺ Recargar',
          saveAndReturn: 'Guardar y volver'
        },
        score: {
          title: '🏆 Marcador',
          nextRoundTitle: '🎊 Próxima Ronda'
        },
        final: {
          winnerLabel: '¡GANADOR!',
          resultTitle: '📊 Resultado Final',
          playAgain: '🎮 Jugar de Nuevo',
          tie: '¡EMPATE!'
        },
        leaderboard: {
          title: 'Clasificación histórica',
          sortLabel: 'Ordenar por',
          sortSub: 'Compara puntuación total, partidas o modos específicos.',
          resetButton: 'Borrar resultados',
          listTitle: 'Jugadores',
          emptyState: 'Aún no hay resultados registrados.',
          pointsLabel: 'puntos',
          matchesLabel: 'partidas',
          sort: {
            total: 'Total de puntos',
            matches: 'Partidas',
            mimeTeams: 'Mímica · Equipos',
            mimeFfa: 'Mímica · Todos contra todos',
            drawingTeams: 'Dibujo · Equipos',
            drawingFfa: 'Dibujo · Todos contra todos',
            name: 'Nombre'
          },
          mode: {
            mimeTeams: 'Mímica · Equipos',
            mimeFfa: 'Mímica · Todos contra todos',
            drawingTeams: 'Dibujo · Equipos',
            drawingFfa: 'Dibujo · Todos contra todos'
          }
        },
        wordbank: {
          title: 'Contenido y Expansiones',
          addTitle: '➕ Añadir Palabra',
          newWordPlaceholder: 'Escribe la palabra...',
          addCategoryHint: 'Se añadirá a la categoría seleccionada.',
          addButton: '➕ Añadir Palabra',
          listTitle: '📋 Palabras',
          resetButton: '↺ Restaurar',
          challengesTitle: '🎯 Desafíos Core',
          addChallengeTitle: '🎯 Añadir Desafío',
          newChallengePlaceholder: 'Escribe el desafío...',
          addChallengeButton: '➕ Añadir Desafío',
          installPackTitle: '📦 Instalar pack',
          installPackSub: 'Sube el archivo .json comprado para desbloquear nuevas palabras en este dispositivo.',
          selectPackFile: '📁 Elegir archivo',
          installedPacksTitle: 'Packs instalados',
          noInstalledPacks: 'Aún no hay packs extra instalados.',
          packEnabled: 'Activo',
          packDisabled: 'Inactivo',
          removePack: 'Eliminar',
          packPreviewTitle: '⭐ Contenido del pack',
          packPreviewPrompt: 'Haz clic en un pack instalado para ver palabras y desafíos.',
          packPreviewWordsTitle: 'Palabras del pack',
          packPreviewChallengesTitle: 'Challenges del pack',
          packPreviewNoWords: 'No hay palabras en este idioma y dificultad.',
          packPreviewNoChallenges: 'No hay challenges en este idioma.',
          packPreviewSelected: ({ name }) => `Mostrando: ${name}`
        },
        settings: {
          title: 'Configuración',
          timerTitle: '⏱️ Temporizador',
          roundTimeLabel: 'Tiempo por Ronda',
          roundTimeSub: 'Segundos para adivinar',
          prepareTimeLabel: 'Tiempo de Preparación',
          prepareTimeSub: 'Segundos antes de que aparezca el chiste',
          penaltyLabel: 'Penalización por Skip',
          penaltySub: '−10 puntos al saltar',
          correctPointsLabel: 'Puntos por risa',
          correctPointsSub: 'Puntos para quien hace reír al otro lado',
          wrongPenaltyPointsLabel: 'Puntos perdidos por no reír',
          wrongPenaltyPointsSub: 'Descuenta puntos cuando nadie se ríe o se acaba el tiempo',
          ffaGuesserPointsLabel: 'Puntos para quien adivina (FFA)',
          ffaGuesserPointsSub: 'En Todos contra todos, elige quién acertó tras cada acierto',
          ffaGuesserPointsValueLabel: 'Puntos de quien acertó',
          ffaGuesserPointsValueSub: 'Valor inicial predeterminado: 5 puntos',
          generalTitle: '⚙️ Configuración General',
          languageLabel: 'Idioma',
          languageSub: 'Cambia la interfaz y el contenido disponible en el juego',
          alertSoundLabel: 'Sonido de Alerta',
          alertSoundSub: 'Beep en los últimos 10 segundos',
          navigationSoundLabel: 'Sonido de Navegación',
          navigationSoundSub: 'Sonido al hacer clic en los botones',
          gameroomMusicLabel: 'Música de menús',
          gameroomMusicSub: 'Suena en inicio, setup y configuración',
          gameplayMusicLabel: 'Música de juego',
          gameplayMusicSub: 'Suena durante preparación, temporizador y marcadores',
          userIdTitle: '🪪 ID de compra',
          userIdLabel: 'Tu user_id',
          userIdSub: 'Usa este código al comprar packs para que el archivo se emita para este dispositivo.',
          copyUserId: 'Copiar',
          userIdBackupSub: 'Exporta una copia de seguridad para restaurar este user_id después de cambiar de navegador o restaurar la aplicación.',
          exportUserIdButton: 'Exportar user_id',
          importUserIdButton: 'Importar user_id',
          wordsTitle: '🎲 Palabras',
          shuffleWordsLabel: 'Mezclar Palabras',
          shuffleWordsSub: 'Orden aleatorio en cada partida',
          appearanceTitle: '🎨 Apariencia',
          themeLabel: 'Tema visual',
          themeSub: 'Cambia colores, transparencias y tipografía de la interfaz',
          resetAllTitle: '🧹 Restaurar aplicación',
          resetAllSub: 'Elimina configuración, jugadores guardados, packs instalados y el user_id de este dispositivo.',
          resetAllButton: 'Restaurar todo'
        },
        donate: {
          title: 'Apoya a Desafío de Mímica',
          chooseTitle: '❤️ Elige cómo donar',
          subtitle: 'Selecciona tu plataforma preferida para apoyar el juego y ayudar a financiar nuevos packs de palabras, idiomas y mejoras.',
          buyMeCoffee: 'Buy Me a Coffee',
          buyMeCoffeeSub: 'Apoyo rápido con una donación puntual a través de Buy Me a Coffee.',
          koFi: 'Ko-fi',
          koFiSub: 'Dona con Ko-fi y ayuda a que el proyecto siga creciendo.',
          whyTitle: '🎭 ¿Por qué donar?',
          whyLanguages: 'Tu apoyo ayuda a financiar nuevos idiomas, packs de contenido y futuras expansiones del banco de palabras.',
          whyUpdates: 'También ayuda a mantener Desafío de Mímica con más pulido, ajustes de balance y nuevas funciones.'
        },
        share: {
          title: 'Desafío de Mímica',
          text: '¡Ven a jugar Desafío de Mímica conmigo!',
          footerAriaLabel: 'Compartir Desafío de Mímica'
        },
        theme: {
          cosmic: 'Cósmico',
          'liquid-glass': 'Otoño',
          material3: 'Primavera',
          'light-mode': 'Modo Claro',
          'dark-mode': 'Modo Oscuro',
          'high-contrast': 'Alto Contraste'
        },
        footer: {
          copyPrefix: '© 2025 Desafío de Mímica v0.1 · Insight X Lab Technologies'
        },
        teams: {
          defaultA: 'Equipo A',
          defaultB: 'Equipo B'
        },
        players: {
          defaultName: 'Jugador {number}'
        },
        dynamic: {
          roundDisplay: ({ current, total }) => `Ronda ${current} de ${total}`,
          diffCount: ({ difficulty, count }) => `${difficulty} · ${count} palabras disponibles`,
          correctTeamPoints: ({ teamName, points }) => `+${points} puntos para ${teamName}!`,
          correctPlayerPoints: ({ playerName, points }) => `+${points} puntos para ${playerName}!`,
          guesserPoints: ({ playerName, points }) => `+${points} puntos para quien acertó: ${playerName}!`,
          correctWithGuesserPoints: ({ actorName, actorPoints, guesserName, guesserPoints }) => `+${actorPoints} para ${actorName} · +${guesserPoints} para ${guesserName}`,
          chooseGuesserPoints: ({ points }) => `Selecciona quién acertó para ganar +${points} puntos.`,
          penaltySkip: ({ points }) => `-${points} puntos (error/skip)`,
          penaltyApplied: ({ playerName, points }) => `-${points} puntos para ${playerName}.`,
          timeUpPenalty: ({ playerName, points }) => `Tiempo agotado. -${points} puntos para ${playerName}.`,
          timeUpNoPoints: '¡Se acabó el tiempo! Sin puntos.',
          skippedNoPoints: 'Palabra saltada. Sin puntos.',
          scoreManagerContext: ({ round, total, playerName }) => `Ronda ${round} de ${total} · Turno de ${playerName}`,
          leaderboardSummary: ({ players, matches }) => `${players} jugador${players !== 1 ? 'es' : ''} · ${matches} partida${matches !== 1 ? 's' : ''}`,
          leaderboardModeStats: ({ points, matches }) => `${points} pts · ${matches} partida${matches !== 1 ? 's' : ''}`,
          roundSummary: ({ roundDone, remaining }) => `Fin de la Ronda ${roundDone} — ${remaining} ronda${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}!`,
          wordAdded: ({ word, difficulty }) => `✅ "${word}" añadida (${difficulty})!`,
          teamAdded: ({ name, teamName }) => `✅ ${name} entró en ${teamName}!`,
          playerAdded: ({ name }) => `✅ ${name} se unió!`,
          packInstalled: ({ name }) => `✅ Pack "${name}" instalado!`,
          packWordsSummary: ({ count }) => `${count} palabra${count !== 1 ? 's' : ''}`,
          packVersion: ({ version }) => `v${version}`,
          challengeAdded: ({ challenge }) => `✅ Desafío "${challenge}" añadido!`
        },
        notifications: {
          duplicateWord: '⚠️ ¡La palabra ya existe!',
          duplicateChallenge: '⚠️ ¡El desafío ya existe!',
          bankRestored: '✅ ¡Banco restaurado!',
          challengeRemoved: 'Desafío eliminado.',
          challengesRestored: '✅ ¡Desafíos restaurados!',
          leaderboardReset: '✅ ¡Clasificación borrada!',
          userIdCopied: '🪪 ¡user_id copiado!',
          userIdExported: '🪪 ¡Copia de user_id exportada!',
          userIdImported: '🪪 ¡user_id restaurado!',
          userIdImportCancelled: 'Importación cancelada.',
          packInstallReading: 'Leyendo archivo...',
          packInstallSuccess: '✅ ¡Pack instalado y activado!',
          packInstallCancelled: 'Instalación cancelada.',
          packRemoved: 'Pack eliminado.',
          packToggled: 'Estado del pack actualizado.',
          maxPlayers: '❌ ¡Máximo 6 jugadores!',
          maxTeamPlayers: '❌ ¡Máximo 3 por equipo!',
          minTeamPlayers: '❌ ¡Mínimo 1 por equipo!',
          minFfaPlayers: '❌ ¡El modo 1 vs 1 necesita exactamente 2 jugadores!',
          maxFfaPlayers: '❌ ¡El modo 1 vs 1 admite como máximo 2 jugadores!',
          donationLinkUnavailable: '⚠️ Configura el enlace de donación de este socio para activarlo.',
          shareCopied: '🔗 ¡Enlace copiado!',
          shareUnavailable: '🔗 Enlace copiado para compartir.',
          shareCopyFailed: '⚠️ No se pudo copiar el enlace.',
          shareInstagramFallback: '🔗 Enlace copiado. Pégalo en Instagram.',
          shareTikTokFallback: '🔗 Enlace copiado. Pégalo en TikTok.',
          fullscreenUnavailable: '⚠️ La pantalla completa no está disponible en este navegador.'
        },
        confirmations: {
          resetWords: '¿Restaurar el banco de palabras predeterminado? Las palabras personalizadas se perderán.',
          resetChallenges: '¿Restaurar los desafíos predeterminados? Los desafíos personalizados se perderán.',
          resetLeaderboard: '¿Borrar todos los resultados de la clasificación histórica?',
          resetAppDefaults: '¿Restaurar toda la aplicación a los valores predeterminados? Se eliminarán configuración, jugadores guardados, packs instalados y user_id.',
          replaceUserId: ({ currentUserId, importedUserId }) => `¿Sustituir el user_id actual (${currentUserId}) por el user_id importado (${importedUserId})? Úsalo solo para restaurar compras ya emitidas para ese ID.`,
          restartGame: '¿Reiniciar el juego? Todo el progreso se perderá.',
          replacePack: ({ packName }) => `Ya existe un pack instalado con este ID (${packName}). ¿Reemplazarlo?`,
          removePack: ({ packName }) => `¿Eliminar el pack "${packName}" de este dispositivo?`
        },
        packErrors: {
          fileRequired: 'Selecciona un archivo de pack.',
          invalidJson: 'Archivo inválido. Sube un JSON de pack.',
          invalidSchema: 'Schema del pack inválido.',
          invalidUser: 'Este pack fue emitido para otro user_id.',
          invalidPackId: 'pack_id ausente o inválido.',
          invalidAlgorithm: 'Algoritmo de firma inválido.',
          invalidSignature: 'Firma inválida. El pack no fue instalado.',
          invalidContentHash: 'Hash de contenido inválido.',
          emptyPack: 'El pack no tiene palabras o desafíos válidos.',
          cryptoUnavailable: 'Este navegador no soporta validación segura de packs.',
          reservedPackId: 'Este pack_id está reservado por el juego.'
        },
        userIdErrors: {
          fileRequired: 'Selecciona un archivo de user_id.',
          invalidJson: 'Archivo inválido. Sube un JSON de user_id.',
          invalidSchema: 'Este archivo no es una copia de user_id de No Laughing Allowed.',
          invalidUserId: 'El user_id del archivo no es válido.'
        }
      }
    };

    function mergeTranslations(base, overrides) {
      const merged = { ...base };
      Object.entries(overrides).forEach(([key, value]) => {
        const isPlainObject = value && typeof value === 'object' && !Array.isArray(value) && typeof value !== 'function';
        merged[key] = isPlainObject ? mergeTranslations(base?.[key] || {}, value) : value;
      });
      return merged;
    }

    TRANSLATIONS.fr = mergeTranslations(TRANSLATIONS.en, {
      meta: { documentTitle: 'Défi du Mime' },
      common: {
        back: '← Retour',
        add: '+ Ajouter',
        copy: 'Copier',
        continue: '▶️ Continuer',
        restart: '🔄 Recommencer',
        home: '🏠 Accueil',
        playerSingular: 'joueur',
        playerPlural: 'joueurs',
        roundSingular: 'manche',
        roundPlural: 'manches'
      },
      language: {
        pt: 'Portugais',
        en: 'Anglais',
        es: 'Espagnol',
        fr: 'Français',
        de: 'Allemand',
        it: 'Italien'
      },
      dev: {
        mode: 'Mode développement',
        description: 'Testez rapidement la mise en page sur mobile, tablette et ordinateur.',
        previewLabel: 'Aperçu de la mise en page',
        preview: { auto: 'Auto', mobile: 'Mobile', tablet: 'Tablette', desktop: 'Ordinateur' }
      },
      home: {
        title: 'Défi du Mime',
        subtitle: 'Dessinez, Devinez et Amusez-vous Ensemble',
        enterFullscreen: 'Plein écran',
        exitFullscreen: 'Quitter le plein écran',
        newGame: '🎮 Nouvelle partie',
        multiDeviceGame: '📡 Connecter les appareils',
        multiDeviceOnline: 'En ligne',
        multiDeviceOffline: 'Hors ligne',
        multiDeviceSummary: ({ status, count }) => `${status} | ${count} appareil${count !== 1 ? 's' : ''} connecté${count !== 1 ? 's' : ''}`,
        quickGame: '⚡ Partie rapide',
        wordBank: '🧩 Contenu et extensions',
        donate: '❤️ Faire un don',
        settings: '⚙️ Paramètres',
        leaderboard: '🏅 Classement historique',
        installOnDevice: '📲 Installer sur l’appareil',
        howToTitle: '🏆 Comment jouer',
        howTo: {
          setupTitle: 'Préparez la partie',
          setupDesc: 'Choisissez équipes ou chacun pour soi, puis définissez manches, difficulté et catégories.',
          turnTitle: 'Regardez et mimez',
          turnDesc: 'Un joueur voit le mot, le mémorise, puis le mime ou le dessine pendant que les autres devinent.',
          timerTitle: 'Course contre la montre',
          timerDesc: 'Le minuteur, les indices et les sons d’alerte rendent chaque tour rapide et amusant.',
          winTitle: 'Marquez des points et gagnez',
          winDesc: 'Chaque bonne réponse vaut 10 points. À la fin des manches, le score désigne le gagnant.'
        }
      },
      multiDevice: {
        title: 'Partie multi-device',
        chooseTitle: 'Que voulez-vous faire ?',
        chooseDesc: 'Ouvrez une session pour contrôler la partie ou connectez cet appareil comme écran auxiliaire.',
        chooseHost: '📡 Ouvrir une session',
        chooseJoin: '🔗 Rejoindre une session',
        changeChoice: 'Changer d’option',
        hostTitle: '📡 Ouvrir une session',
        hostDesc: 'Cet appareil contrôle la partie. Les autres rejoignent pour voir le minuteur, les indices et le dessin.',
        openSession: 'Ouvrir la session',
        hostCreating: 'Création de la session...',
        hostReady: 'Session ouverte. Scannez le QR Code sur les autres appareils.',
        hostError: 'Impossible d’ouvrir la session.',
        sessionCode: 'Code de session :',
        guestsConnected: ({ count }) => `${count} appareil${count !== 1 ? 's' : ''} connecté${count !== 1 ? 's' : ''}`,
        online: 'En ligne',
        offline: 'Hors ligne',
        continueSetup: 'Continuer la configuration',
        joinTitle: '🔗 Rejoindre',
        joinDesc: 'Rejoignez comme écran auxiliaire pour suivre la partie de l’hôte.',
        joinCodeLabel: 'Code ou lien de session',
        joinCodePlaceholder: 'Collez le code ou le lien',
        joinSession: 'Rejoindre la session',
        joinHelp: 'Vous pouvez aussi scanner le QR Code affiché sur l’hôte.',
        waitingTitle: 'En attente des données de la partie',
        guestLabel: 'Écran auxiliaire',
        connecting: 'Connexion...',
        connected: 'Connecté',
        disconnected: 'Déconnecté',
        guestWaiting: 'En attente du lancement par l’hôte.',
        guestPreparing: 'En attente que l’hôte prépare la manche.',
        guestMemorizing: 'Prépare-toi ! La blague arrive dans un instant.',
        guestPlaying: 'Devinez !',
        guestScore: 'En attente du prochain tour.',
        guestFinal: 'Partie terminée.',
        liveDrawing: '✏️ Dessin en direct',
        disconnect: 'Se déconnecter',
        linkCopied: '🔗 Lien de session copié !',
        missingSession: 'Saisissez le code de session.',
        peerUnavailable: 'PeerJS n’a pas chargé. Vérifiez la connexion et réessayez.',
        qrUnavailable: 'QR Code indisponible. Utilisez le lien ou le code de session.'
      },
      setup: {
        title: 'Nouvelle partie',
        gameTypeTitle: '1️⃣ Type de jeu',
        gameTypeMimeName: 'Mime',
        gameTypeMimeDesc: 'Jouez sans parler',
        gameTypeDrawingName: 'Dessin',
        gameTypeDrawingDesc: 'Dessinez le mot',
        modeTitle: '2️⃣ Mode de jeu',
        modeTeamsName: 'Deux équipes',
        modeTeamsDesc: 'Les équipes s’affrontent',
        modeFfaName: 'Chacun pour soi',
        modeFfaDesc: 'Tous contre tous',
        teamPlayersTitle: '3️⃣ Joueurs par équipe',
        playersTitle: '2️⃣ Joueurs',
        teamAPlaceholder: 'Nom de l’équipe A',
        teamBPlaceholder: 'Nom de l’équipe B',
        playerNamePlaceholder: 'Nom du joueur...',
        teamHelper: '💡 Minimum 1 par équipe, maximum 3 par équipe (jusqu’à 6 joueurs)',
        ffaHelper: '💡 Exactement 2 joueurs',
        difficultyTitle: '4️⃣ Difficulté',
        difficultyEasyDesc: 'Idéal pour les enfants et débutants',
        difficultyNormalDesc: 'Défi équilibré pour toute la famille',
        difficultyHardDesc: 'Mots complexes, pour les courageux !',
        optionsTitle: '5️⃣ Options de jeu',
        randomChallengeLabel: 'Défi aléatoire',
        randomChallengeSub: 'Ajoute des modificateurs au mime',
        randomChallengeDisabledSub: 'Indisponible en mode dessin',
        categoriesLabel: 'Catégories disponibles',
        coreCategoriesLabel: 'Catégories core',
        premiumCategoriesLabel: 'Catégories premium',
        matchTitle: '6️⃣ Configurer la partie',
        roundsLabel: 'Nombre de manches',
        roundsSub: 'Nombre de manches par joueur',
        startGame: '🎭 Commencer !'
      },
      difficulty: { easy: 'Facile', normal: 'Normal', hard: 'Difficile' },
      category: {
        objects: { plural: 'Objets', singular: 'Objet', tab: '🧸 Objets', option: '🧸 Objets' },
        actions: { plural: 'Actions', singular: 'Action', tab: '🏃 Actions', option: '🏃 Actions' },
        animals: { plural: 'Animaux', singular: 'Animal', tab: '🐾 Animaux', option: '🐾 Animaux' },
        movies: { plural: 'Films', singular: 'Film', tab: '🎬 Films', option: '🎬 Films' },
        professions: { plural: 'Métiers', singular: 'Métier', tab: '👔 Métiers', option: '👔 Métiers' },
        celebrities: { plural: 'Célébrités', singular: 'Célébrité', tab: '⭐ Célébrités', option: '⭐ Célébrités' }
      },
      game: {
        currentPlayerLabel: 'Au tour du mime :',
        currentPlayerDrawingLabel: 'Au tour de dessiner :',
        readyTitle: 'Prêts à voir le mot ?',
        readyDrawingTitle: 'Prêts à voir quoi dessiner ?',
        readySub: 'Seul le mime doit regarder ! Les autres ferment les yeux ! 👀',
        readyDrawingSub: 'Seul le dessinateur doit regarder ! Les autres ferment les yeux ! 👀',
        revealWord: '🎲 Révéler le mot',
        memorizeTitle: '⚡ Prépare-toi !',
        startsIn: 'La blague apparaît dans...',
        onlyMimeCanSee: 'Seul le mime peut voir !',
        onlyDrawerCanSee: 'Seul le dessinateur peut voir !',
        secondsLabel: 'SECONDES',
        hiddenWord: 'Mot masqué',
        hintTitle: '💡 Indice',
        showWord: '👁️ Afficher le mot',
        hideWord: '🙈 Masquer le mot',
        correct: '✅ Correct !',
        wrong: '❌ Raté / Skip',
        challengePrefix: '🎯 Défi :'
      },
      drawing: {
        canvasLabel: 'Zone de dessin',
        toolbarLabel: 'Outils de dessin',
        penThick: 'Trait épais',
        penThin: 'Trait fin',
        eraserThick: 'Grosse gomme',
        eraserThin: 'Petite gomme',
        clear: 'Effacer le canvas'
      },
      result: {
        correctTitle: 'Correct !',
        wrongTitle: 'Raté !',
        timeUpTitle: 'Temps écoulé !',
        guesserLabel: 'Qui a deviné ?',
        guesserPlaceholder: 'Sélectionnez qui a deviné',
        nextTurn: '➡️ Tour suivant'
      },
      scoreManager: {
        manageButton: '⚖️ Gérer',
        title: 'Gérer le score',
        backToGame: '← Retour au jeu',
        currentScoreTitle: 'Score actuel',
        resetInputs: '↺ Recharger',
        saveAndReturn: 'Enregistrer et revenir'
      },
      score: { title: '🏆 Score', nextRoundTitle: '🎊 Prochaine manche' },
      final: { winnerLabel: 'GAGNANT !', resultTitle: '📊 Résultat final', playAgain: '🎮 Rejouer', tie: 'ÉGALITÉ !' },
      leaderboard: {
        title: 'Classement historique',
        sortLabel: 'Trier par',
        sortSub: 'Comparez le score total, les parties ou les modes précis.',
        resetButton: 'Effacer les résultats',
        listTitle: 'Joueurs',
        emptyState: 'Aucun résultat enregistré pour le moment.',
        pointsLabel: 'points',
        matchesLabel: 'parties',
        sort: {
          total: 'Total de points',
          matches: 'Parties',
          mimeTeams: 'Mime · Équipes',
          mimeFfa: 'Mime · Chacun pour soi',
          drawingTeams: 'Dessin · Équipes',
          drawingFfa: 'Dessin · Chacun pour soi',
          name: 'Nom'
        },
        mode: {
          mimeTeams: 'Mime · Équipes',
          mimeFfa: 'Mime · Chacun pour soi',
          drawingTeams: 'Dessin · Équipes',
          drawingFfa: 'Dessin · Chacun pour soi'
        }
      },
      wordbank: {
        title: 'Contenu et extensions',
        addTitle: '➕ Ajouter un mot',
        newWordPlaceholder: 'Saisissez le mot...',
        addCategoryHint: 'Il sera ajouté à la catégorie sélectionnée.',
        addButton: '➕ Ajouter le mot',
        listTitle: '📋 Mots',
        resetButton: '↺ Restaurer',
        challengesTitle: '🎯 Défis core',
        addChallengeTitle: '🎯 Ajouter un défi',
        newChallengePlaceholder: 'Saisissez le défi...',
        addChallengeButton: '➕ Ajouter le défi',
        installPackTitle: '📦 Installer un pack',
        installPackSub: 'Envoyez le fichier .json acheté pour débloquer de nouveaux mots sur cet appareil.',
        selectPackFile: '📁 Choisir un fichier',
        installedPacksTitle: 'Packs installés',
        noInstalledPacks: 'Aucun pack supplémentaire installé pour le moment.',
        packEnabled: 'Actif',
        packDisabled: 'Inactif',
        removePack: 'Supprimer',
        packPreviewTitle: '⭐ Contenu du pack',
        packPreviewPrompt: 'Cliquez sur un pack installé pour voir les mots et défis.',
        packPreviewWordsTitle: 'Mots du pack',
        packPreviewChallengesTitle: 'Défis du pack',
        packPreviewNoWords: 'Aucun mot dans cette langue et difficulté.',
        packPreviewNoChallenges: 'Aucun défi dans cette langue.',
        packPreviewSelected: ({ name }) => `Affichage : ${name}`
      },
      settings: {
        title: 'Paramètres',
        timerTitle: '⏱️ Minuteur',
        roundTimeLabel: 'Temps par manche',
        roundTimeSub: 'Secondes pour deviner',
        prepareTimeLabel: 'Temps de préparation',
        prepareTimeSub: 'Secondes avant l’apparition de la blague',
        penaltyLabel: 'Pénalité de skip',
        penaltySub: '−10 points en passant',
        correctPointsLabel: 'Points par rire',
        correctPointsSub: 'Points pour celui qui fait rire l’autre camp',
        wrongPenaltyPointsLabel: 'Points perdus pour ne pas rire',
        wrongPenaltyPointsSub: 'Retire des points si personne ne rit ou si le temps expire',
        ffaGuesserPointsLabel: 'Points pour celui qui devine (FFA)',
        ffaGuesserPointsSub: 'En chacun pour soi, choisissez qui a deviné après chaque bonne réponse',
        ffaGuesserPointsValueLabel: 'Points de celui qui a deviné',
        ffaGuesserPointsValueSub: 'Valeur initiale par défaut : 5 points',
        generalTitle: '⚙️ Paramètres généraux',
        languageLabel: 'Langue',
        languageSub: 'Change l’interface et le contenu disponible dans le jeu',
        alertSoundLabel: 'Son d’alerte',
        alertSoundSub: 'Bip pendant les 10 dernières secondes',
        navigationSoundLabel: 'Son de navigation',
        navigationSoundSub: 'Son lors des clics sur l’interface',
        gameroomMusicLabel: 'Musique des menus',
        gameroomMusicSub: 'Jouée sur l’accueil, la configuration et les paramètres',
        gameplayMusicLabel: 'Musique de jeu',
        gameplayMusicSub: 'Jouée pendant la préparation, le minuteur et les scores',
        userIdTitle: '🪪 ID d’achat',
        userIdLabel: 'Votre user_id',
        userIdSub: 'Utilisez ce code lors de l’achat de packs pour que le fichier soit émis pour cet appareil.',
        copyUserId: 'Copier',
        userIdBackupSub: 'Exportez une sauvegarde pour restaurer ce user_id après un changement de navigateur ou une réinitialisation de l’application.',
        exportUserIdButton: 'Exporter user_id',
        importUserIdButton: 'Importer user_id',
        wordsTitle: '🎲 Mots',
        shuffleWordsLabel: 'Mélanger les mots',
        shuffleWordsSub: 'Ordre aléatoire à chaque partie',
        appearanceTitle: '🎨 Apparence',
        themeLabel: 'Thème visuel',
        themeSub: 'Change les couleurs, transparences et typographies de l’interface',
        resetAllTitle: '🧹 Restaurer l’application',
        resetAllSub: 'Supprime paramètres, joueurs sauvegardés, packs installés et user_id de cet appareil.',
        resetAllButton: 'Tout restaurer'
      },
      donate: {
        title: 'Soutenez Défi du Mime',
        chooseTitle: '❤️ Choisissez comment donner',
        subtitle: 'Choisissez votre plateforme préférée pour soutenir le jeu et financer de nouveaux packs de mots, langues et améliorations.',
        buyMeCoffeeSub: 'Soutien rapide et direct avec un don ponctuel.',
        koFiSub: 'Faites un don via Ko-fi et aidez le projet à grandir.',
        whyTitle: '🎭 Pourquoi donner ?',
        whyLanguages: 'Votre soutien aide à financer de nouvelles langues, packs de contenu et extensions de la banque de mots.',
        whyUpdates: 'Il aide aussi à maintenir Défi du Mime avec du polish, de l’équilibrage et de nouvelles fonctionnalités.'
      },
      share: {
        title: 'Défi du Mime',
        text: 'Viens jouer à Défi du Mime avec moi !',
        footerAriaLabel: 'Partager Défi du Mime'
      },
      theme: { cosmic: 'Cosmique', 'liquid-glass': 'Automne', material3: 'Printemps', 'light-mode': 'Mode clair', 'dark-mode': 'Mode sombre', 'high-contrast': 'Contraste élevé' },
      footer: { copyPrefix: '© 2025 Défi du Mime v0.1 · Insight X Lab Technologies' },
      teams: { defaultA: 'Équipe A', defaultB: 'Équipe B' },
      players: { defaultName: 'Joueur {number}' },
      dynamic: {
        roundDisplay: ({ current, total }) => `Manche ${current} sur ${total}`,
        diffCount: ({ difficulty, count }) => `${difficulty} · ${count} mots disponibles`,
        correctTeamPoints: ({ teamName, points }) => `+${points} points pour ${teamName} !`,
        correctPlayerPoints: ({ playerName, points }) => `+${points} points pour ${playerName} !`,
        guesserPoints: ({ playerName, points }) => `+${points} points pour celui qui a deviné : ${playerName} !`,
        correctWithGuesserPoints: ({ actorName, actorPoints, guesserName, guesserPoints }) => `+${actorPoints} pour ${actorName} · +${guesserPoints} pour ${guesserName}`,
        chooseGuesserPoints: ({ points }) => `Sélectionnez qui a deviné pour gagner +${points} points.`,
        penaltySkip: ({ points }) => `-${points} points (erreur/skip)`,
        penaltyApplied: ({ playerName, points }) => `-${points} points pour ${playerName}.`,
        timeUpPenalty: ({ playerName, points }) => `Temps écoulé. -${points} points pour ${playerName}.`,
        timeUpNoPoints: 'Temps écoulé ! Aucun point.',
        skippedNoPoints: 'Mot passé. Aucun point.',
        scoreManagerContext: ({ round, total, playerName }) => `Manche ${round} sur ${total} · Tour de ${playerName}`,
        leaderboardSummary: ({ players, matches }) => `${players} joueur${players !== 1 ? 's' : ''} · ${matches} partie${matches !== 1 ? 's' : ''}`,
        leaderboardModeStats: ({ points, matches }) => `${points} pts · ${matches} partie${matches !== 1 ? 's' : ''}`,
        roundSummary: ({ roundDone, remaining }) => `Fin de la manche ${roundDone} — ${remaining} manche${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''} !`,
        wordAdded: ({ word, difficulty }) => `✅ "${word}" ajouté (${difficulty}) !`,
        teamAdded: ({ name, teamName }) => `✅ ${name} rejoint ${teamName} !`,
        playerAdded: ({ name }) => `✅ ${name} est entré !`,
        packInstalled: ({ name }) => `✅ Pack "${name}" installé !`,
        packWordsSummary: ({ count }) => `${count} mot${count !== 1 ? 's' : ''}`,
        packVersion: ({ version }) => `v${version}`,
        challengeAdded: ({ challenge }) => `✅ Défi "${challenge}" ajouté !`
      },
      notifications: {
        duplicateWord: '⚠️ Ce mot existe déjà !',
        duplicateChallenge: '⚠️ Ce défi existe déjà !',
        bankRestored: '✅ Banque de mots restaurée !',
        challengeRemoved: 'Défi supprimé.',
        challengesRestored: '✅ Défis restaurés !',
        leaderboardReset: '✅ Classement effacé !',
        userIdCopied: '🪪 user_id copié !',
        userIdExported: '🪪 Sauvegarde du user_id exportée !',
        userIdImported: '🪪 user_id restauré !',
        userIdImportCancelled: 'Importation annulée.',
        packInstallReading: 'Lecture du fichier...',
        packInstallSuccess: '✅ Pack installé et activé !',
        packInstallCancelled: 'Installation annulée.',
        packRemoved: 'Pack supprimé.',
        packToggled: 'Statut du pack mis à jour.',
        maxPlayers: '❌ Maximum 6 joueurs !',
        maxTeamPlayers: '❌ Maximum 3 par équipe !',
        minTeamPlayers: '❌ Minimum 1 par équipe !',
        minFfaPlayers: '❌ Le mode 1 contre 1 exige exactement 2 joueurs !',
        maxFfaPlayers: '❌ Le mode 1 contre 1 accepte au maximum 2 joueurs !',
        donationLinkUnavailable: '⚠️ Configurez le lien de don de ce partenaire pour l’activer.',
        shareCopied: '🔗 Lien copié !',
        shareUnavailable: '🔗 Lien copié pour partager.',
        shareCopyFailed: '⚠️ Impossible de copier le lien.',
        shareInstagramFallback: '🔗 Lien copié. Collez-le dans Instagram.',
        shareTikTokFallback: '🔗 Lien copié. Collez-le dans TikTok.',
        fullscreenUnavailable: '⚠️ Plein écran indisponible dans ce navigateur.'
      },
      confirmations: {
        resetWords: 'Restaurer la banque de mots par défaut ? Les mots personnalisés seront perdus.',
        resetChallenges: 'Restaurer les défis par défaut ? Les défis personnalisés seront perdus.',
        resetLeaderboard: 'Effacer tous les résultats du classement historique ?',
        resetAppDefaults: 'Restaurer toute l’application par défaut ? Les paramètres, joueurs sauvegardés, packs installés et user_id seront effacés.',
        replaceUserId: ({ currentUserId, importedUserId }) => `Remplacer le user_id actuel (${currentUserId}) par le user_id importé (${importedUserId}) ? À utiliser uniquement pour restaurer des achats déjà émis pour cet ID.`,
        restartGame: 'Recommencer la partie ? Toute la progression sera perdue.',
        replacePack: ({ packName }) => `Un pack avec cet ID est déjà installé (${packName}). Le remplacer ?`,
        removePack: ({ packName }) => `Supprimer le pack "${packName}" de cet appareil ?`
      },
      packErrors: {
        fileRequired: 'Sélectionnez un fichier de pack.',
        invalidJson: 'Fichier invalide. Envoyez un JSON de pack.',
        invalidSchema: 'Schéma du pack invalide.',
        invalidUser: 'Ce pack a été émis pour un autre user_id.',
        invalidPackId: 'pack_id manquant ou invalide.',
        invalidAlgorithm: 'Algorithme de signature invalide.',
        invalidSignature: 'Signature invalide. Le pack n’a pas été installé.',
        invalidContentHash: 'Hash du contenu invalide.',
        emptyPack: 'Le pack ne contient aucun mot ou défi valide.',
        cryptoUnavailable: 'Ce navigateur ne prend pas en charge la validation sécurisée des packs.',
        reservedPackId: 'Ce pack_id est réservé par le jeu.'
      },
      userIdErrors: {
        fileRequired: 'Sélectionnez un fichier de user_id.',
        invalidJson: 'Fichier invalide. Envoyez un JSON de user_id.',
        invalidSchema: 'Ce fichier n’est pas une sauvegarde user_id de No Laughing Allowed.',
        invalidUserId: 'Le user_id du fichier est invalide.'
      }
    });

    TRANSLATIONS.de = mergeTranslations(TRANSLATIONS.en, {
      meta: { documentTitle: 'Pantomime Challenge' },
      common: {
        back: '← Zurück',
        add: '+ Hinzufügen',
        copy: 'Kopieren',
        continue: '▶️ Weiter',
        restart: '🔄 Neustarten',
        home: '🏠 Start',
        playerSingular: 'Spieler',
        playerPlural: 'Spieler',
        roundSingular: 'Runde',
        roundPlural: 'Runden'
      },
      language: { pt: 'Portugiesisch', en: 'Englisch', es: 'Spanisch', fr: 'Französisch', de: 'Deutsch', it: 'Italienisch' },
      dev: {
        mode: 'Entwicklungsmodus',
        description: 'Teste das Layout schnell auf Mobilgerät, Tablet und Desktop.',
        previewLabel: 'Layout-Vorschau',
        preview: { auto: 'Auto', mobile: 'Mobil', tablet: 'Tablet', desktop: 'Desktop' }
      },
      home: {
        title: 'Pantomime Challenge',
        subtitle: 'Zeichnen, Raten und Gemeinsam Spaß Haben',
        enterFullscreen: 'Vollbild',
        exitFullscreen: 'Vollbild verlassen',
        newGame: '🎮 Neues Spiel',
        multiDeviceGame: '📡 Geräte verbinden',
        multiDeviceOnline: 'Online',
        multiDeviceOffline: 'Offline',
        multiDeviceSummary: ({ status, count }) => `${status} | ${count} Gerät${count !== 1 ? 'e' : ''} verbunden`,
        quickGame: '⚡ Schnellspiel',
        wordBank: '🧩 Inhalte und Erweiterungen',
        donate: '❤️ Spenden',
        settings: '⚙️ Einstellungen',
        leaderboard: '🏅 Bestenliste',
        installOnDevice: '📲 Auf Gerät installieren',
        howToTitle: '🏆 Spielanleitung',
        howTo: {
          setupTitle: 'Spiel einrichten',
          setupDesc: 'Wähle Teams oder Jeder gegen jeden und lege Runden, Schwierigkeit und Kategorien fest.',
          turnTitle: 'Ansehen und vorspielen',
          turnDesc: 'Ein Spieler sieht das Wort, merkt es sich und stellt es dar oder zeichnet, während alle anderen raten.',
          timerTitle: 'Gegen die Zeit',
          timerDesc: 'Timer, Hinweise und Warntöne halten jede Runde schnell, klar und unterhaltsam.',
          winTitle: 'Punkte sammeln und gewinnen',
          winDesc: 'Jede richtige Antwort zählt 10 Punkte. Am Ende entscheiden die Punkte über den Sieg.'
        }
      },
      multiDevice: {
        title: 'Multi-Device-Spiel',
        chooseTitle: 'Was möchtest du tun?',
        chooseDesc: 'Öffne eine Sitzung, um das Spiel zu steuern, oder verbinde dieses Gerät als Zusatzbildschirm.',
        chooseHost: '📡 Sitzung öffnen',
        chooseJoin: '🔗 Sitzung beitreten',
        changeChoice: 'Option ändern',
        hostTitle: '📡 Sitzung öffnen',
        hostDesc: 'Dieses Gerät steuert das Spiel. Andere Geräte sehen Timer, Hinweise und Zeichnung.',
        openSession: 'Sitzung öffnen',
        hostCreating: 'Sitzung wird erstellt...',
        hostReady: 'Sitzung geöffnet. Scanne den QR-Code auf den anderen Geräten.',
        hostError: 'Sitzung konnte nicht geöffnet werden.',
        sessionCode: 'Sitzungscode:',
        guestsConnected: ({ count }) => `${count} Gerät${count !== 1 ? 'e' : ''} verbunden`,
        online: 'Online',
        offline: 'Offline',
        continueSetup: 'Einrichtung fortsetzen',
        joinTitle: '🔗 Beitreten',
        joinDesc: 'Als Zusatzbildschirm beitreten, um dem Host-Spiel zu folgen.',
        joinCodeLabel: 'Sitzungscode oder Link',
        joinCodePlaceholder: 'Code oder Link einfügen',
        joinSession: 'Sitzung beitreten',
        joinHelp: 'Du kannst auch den QR-Code auf dem Host scannen.',
        waitingTitle: 'Warte auf Spieldaten',
        guestLabel: 'Zusatzbildschirm',
        connecting: 'Verbinden...',
        connected: 'Verbunden',
        disconnected: 'Getrennt',
        guestWaiting: 'Warte, bis der Host das Spiel startet.',
        guestPreparing: 'Warte, bis der Host die Runde vorbereitet hat.',
        guestMemorizing: 'Mach dich bereit! Der Witz erscheint gleich.',
        guestPlaying: 'Rat mal!',
        guestScore: 'Warte auf den nächsten Zug.',
        guestFinal: 'Spiel beendet.',
        liveDrawing: '✏️ Live-Zeichnung',
        disconnect: 'Trennen',
        linkCopied: '🔗 Sitzungslink kopiert!',
        missingSession: 'Gib den Sitzungscode ein.',
        peerUnavailable: 'PeerJS wurde nicht geladen. Prüfe die Verbindung und versuche es erneut.',
        qrUnavailable: 'QR-Code nicht verfügbar. Nutze den Link oder Sitzungscode.'
      },
      setup: {
        title: 'Neues Spiel',
        gameTypeTitle: '1️⃣ Spieltyp',
        gameTypeMimeName: 'Pantomime',
        gameTypeMimeDesc: 'Ohne Sprechen darstellen',
        gameTypeDrawingName: 'Zeichnen',
        gameTypeDrawingDesc: 'Zeichne das Wort',
        modeTitle: '2️⃣ Spielmodus',
        modeTeamsName: 'Zwei Teams',
        modeTeamsDesc: 'Teams treten an',
        modeFfaName: 'Jeder gegen jeden',
        modeFfaDesc: 'Alle gegen alle',
        teamPlayersTitle: '3️⃣ Spieler pro Team',
        playersTitle: '2️⃣ Spieler',
        teamAPlaceholder: 'Name von Team A',
        teamBPlaceholder: 'Name von Team B',
        playerNamePlaceholder: 'Spielername...',
        teamHelper: '💡 Mindestens 1 pro Team, höchstens 3 pro Team (bis zu 6 Spieler)',
        ffaHelper: '💡 Genau 2 Spieler',
        difficultyTitle: '4️⃣ Schwierigkeit',
        difficultyEasyDesc: 'Ideal für Kinder und Anfänger',
        difficultyNormalDesc: 'Ausgewogene Herausforderung für die Familie',
        difficultyHardDesc: 'Komplexe Wörter für Mutige!',
        optionsTitle: '5️⃣ Spieloptionen',
        randomChallengeLabel: 'Zufällige Herausforderung',
        randomChallengeSub: 'Fügt der Pantomime Modifikatoren hinzu',
        randomChallengeDisabledSub: 'Im Zeichenmodus nicht verfügbar',
        categoriesLabel: 'Verfügbare Kategorien',
        coreCategoriesLabel: 'Core-Kategorien',
        premiumCategoriesLabel: 'Premium-Kategorien',
        matchTitle: '6️⃣ Spiel einrichten',
        roundsLabel: 'Anzahl der Runden',
        roundsSub: 'Runden pro Spieler',
        startGame: '🎭 Spiel starten!'
      },
      difficulty: { easy: 'Einfach', normal: 'Normal', hard: 'Schwer' },
      category: {
        objects: { plural: 'Objekte', singular: 'Objekt', tab: '🧸 Objekte', option: '🧸 Objekte' },
        actions: { plural: 'Aktionen', singular: 'Aktion', tab: '🏃 Aktionen', option: '🏃 Aktionen' },
        animals: { plural: 'Tiere', singular: 'Tier', tab: '🐾 Tiere', option: '🐾 Tiere' },
        movies: { plural: 'Filme', singular: 'Film', tab: '🎬 Filme', option: '🎬 Filme' },
        professions: { plural: 'Berufe', singular: 'Beruf', tab: '👔 Berufe', option: '👔 Berufe' },
        celebrities: { plural: 'Prominente', singular: 'Prominenter', tab: '⭐ Prominente', option: '⭐ Prominente' }
      },
      game: {
        currentPlayerLabel: 'Pantomime-Spieler ist dran:',
        currentPlayerDrawingLabel: 'Zeichner ist dran:',
        readyTitle: 'Bereit, das Wort zu sehen?',
        readyDrawingTitle: 'Bereit zu sehen, was gezeichnet wird?',
        readySub: 'Nur der Mime darf schauen! Alle anderen Augen zu! 👀',
        readyDrawingSub: 'Nur der Zeichner darf schauen! Alle anderen Augen zu! 👀',
        revealWord: '🎲 Wort anzeigen',
        memorizeTitle: '⚡ Mach dich bereit!',
        startsIn: 'Der Witz erscheint in...',
        onlyMimeCanSee: 'Nur der Mime darf es sehen!',
        onlyDrawerCanSee: 'Nur der Zeichner darf es sehen!',
        secondsLabel: 'SEKUNDEN',
        hiddenWord: 'Verstecktes Wort',
        hintTitle: '💡 Hinweis',
        showWord: '👁️ Wort zeigen',
        hideWord: '🙈 Wort verbergen',
        correct: '✅ Richtig!',
        wrong: '❌ Falsch / Skip',
        challengePrefix: '🎯 Herausforderung:'
      },
      drawing: {
        canvasLabel: 'Zeichenfläche',
        toolbarLabel: 'Zeichenwerkzeuge',
        penThick: 'Dicke Linie',
        penThin: 'Dünne Linie',
        eraserThick: 'Dicker Radierer',
        eraserThin: 'Dünner Radierer',
        clear: 'Canvas leeren'
      },
      result: {
        correctTitle: 'Richtig!',
        wrongTitle: 'Falsch!',
        timeUpTitle: 'Zeit abgelaufen!',
        guesserLabel: 'Wer hat geraten?',
        guesserPlaceholder: 'Wähle aus, wer geraten hat',
        nextTurn: '➡️ Nächster Zug'
      },
      scoreManager: {
        manageButton: '⚖️ Verwalten',
        title: 'Punktestand verwalten',
        backToGame: '← Zurück zum Spiel',
        currentScoreTitle: 'Aktueller Punktestand',
        resetInputs: '↺ Neu laden',
        saveAndReturn: 'Speichern und zurück'
      },
      score: { title: '🏆 Punktestand', nextRoundTitle: '🎊 Nächste Runde' },
      final: { winnerLabel: 'GEWINNER!', resultTitle: '📊 Endergebnis', playAgain: '🎮 Nochmals spielen', tie: 'UNENTSCHIEDEN!' },
      leaderboard: {
        title: 'Ewige Bestenliste',
        sortLabel: 'Sortieren nach',
        sortSub: 'Vergleiche Gesamtpunkte, Partien oder bestimmte Modi.',
        resetButton: 'Ergebnisse löschen',
        listTitle: 'Spieler',
        emptyState: 'Noch keine gespeicherten Ergebnisse.',
        pointsLabel: 'Punkte',
        matchesLabel: 'Partien',
        sort: {
          total: 'Gesamtpunkte',
          matches: 'Partien',
          mimeTeams: 'Pantomime · Teams',
          mimeFfa: 'Pantomime · Jeder gegen jeden',
          drawingTeams: 'Zeichnen · Teams',
          drawingFfa: 'Zeichnen · Jeder gegen jeden',
          name: 'Name'
        },
        mode: {
          mimeTeams: 'Pantomime · Teams',
          mimeFfa: 'Pantomime · Jeder gegen jeden',
          drawingTeams: 'Zeichnen · Teams',
          drawingFfa: 'Zeichnen · Jeder gegen jeden'
        }
      },
      wordbank: {
        title: 'Inhalte und Erweiterungen',
        addTitle: '➕ Wort hinzufügen',
        newWordPlaceholder: 'Wort eingeben...',
        addCategoryHint: 'Wird zur ausgewählten Kategorie hinzugefügt.',
        addButton: '➕ Wort hinzufügen',
        listTitle: '📋 Wörter',
        resetButton: '↺ Wiederherstellen',
        challengesTitle: '🎯 Core-Herausforderungen',
        addChallengeTitle: '🎯 Herausforderung hinzufügen',
        newChallengePlaceholder: 'Herausforderung eingeben...',
        addChallengeButton: '➕ Herausforderung hinzufügen',
        installPackTitle: '📦 Pack installieren',
        installPackSub: 'Lade die gekaufte .json-Datei hoch, um neue Wörter auf diesem Gerät freizuschalten.',
        selectPackFile: '📁 Datei wählen',
        installedPacksTitle: 'Installierte Packs',
        noInstalledPacks: 'Noch keine zusätzlichen Packs installiert.',
        packEnabled: 'Aktiv',
        packDisabled: 'Inaktiv',
        removePack: 'Entfernen',
        packPreviewTitle: '⭐ Pack-Inhalt',
        packPreviewPrompt: 'Klicke auf ein installiertes Pack, um Wörter und Herausforderungen zu sehen.',
        packPreviewWordsTitle: 'Wörter des Packs',
        packPreviewChallengesTitle: 'Herausforderungen des Packs',
        packPreviewNoWords: 'Keine Wörter in dieser Sprache und Schwierigkeit.',
        packPreviewNoChallenges: 'Keine Herausforderungen in dieser Sprache.',
        packPreviewSelected: ({ name }) => `Anzeige: ${name}`
      },
      settings: {
        title: 'Einstellungen',
        timerTitle: '⏱️ Timer',
        roundTimeLabel: 'Zeit pro Runde',
        roundTimeSub: 'Sekunden zum Raten',
        prepareTimeLabel: 'Vorbereitungszeit',
        prepareTimeSub: 'Sekunden, bevor der Witz erscheint',
        penaltyLabel: 'Skip-Strafe',
        penaltySub: '−10 Punkte beim Überspringen',
        correctPointsLabel: 'Punkte pro Lacher',
        correctPointsSub: 'Punkte für den Spieler, der die andere Seite zum Lachen bringt',
        wrongPenaltyPointsLabel: 'Punktverlust fürs Nichtlachen',
        wrongPenaltyPointsSub: 'Zieht Punkte ab, wenn niemand lacht oder die Zeit abläuft',
        ffaGuesserPointsLabel: 'Punkte für den Ratenden (FFA)',
        ffaGuesserPointsSub: 'In Jeder gegen jeden nach jedem Treffer auswählen, wer geraten hat',
        ffaGuesserPointsValueLabel: 'Punkte für den Ratenden',
        ffaGuesserPointsValueSub: 'Anfangsstandard: 5 Punkte',
        generalTitle: '⚙️ Allgemeine Einstellungen',
        languageLabel: 'Sprache',
        languageSub: 'Ändert die Oberfläche und die im Spiel verfügbaren Inhalte',
        alertSoundLabel: 'Warnton',
        alertSoundSub: 'Piepton in den letzten 10 Sekunden',
        navigationSoundLabel: 'Navigationssound',
        navigationSoundSub: 'Sound beim Klicken auf Interface-Buttons',
        gameroomMusicLabel: 'Menümusik',
        gameroomMusicSub: 'Läuft auf Startseite, Setup und Einstellungen',
        gameplayMusicLabel: 'Gameplay-Musik',
        gameplayMusicSub: 'Läuft während Vorbereitung, Timer und Punkteständen',
        userIdTitle: '🪪 Kauf-ID',
        userIdLabel: 'Deine user_id',
        userIdSub: 'Nutze diesen Code beim Kauf von Packs, damit die Datei für dieses Gerät ausgestellt wird.',
        copyUserId: 'Kopieren',
        userIdBackupSub: 'Exportiere ein Backup, um diese user_id nach einem Browserwechsel oder Zurücksetzen der App wiederherzustellen.',
        exportUserIdButton: 'user_id exportieren',
        importUserIdButton: 'user_id importieren',
        wordsTitle: '🎲 Wörter',
        shuffleWordsLabel: 'Wörter mischen',
        shuffleWordsSub: 'Zufällige Reihenfolge in jedem Spiel',
        appearanceTitle: '🎨 Erscheinungsbild',
        themeLabel: 'Visuelles Theme',
        themeSub: 'Ändere Farben, Transparenzen und Typografie der Oberfläche',
        resetAllTitle: '🧹 Anwendung zurücksetzen',
        resetAllSub: 'Entfernt Einstellungen, gespeicherte Spieler, installierte Packs und die user_id dieses Geräts.',
        resetAllButton: 'Alles zurücksetzen'
      },
      donate: {
        title: 'Pantomime Challenge unterstützen',
        chooseTitle: '❤️ Wähle deine Spendenart',
        subtitle: 'Wähle deine bevorzugte Plattform, um das Spiel zu unterstützen und neue Wortpacks, Sprachen und Verbesserungen zu finanzieren.',
        buyMeCoffeeSub: 'Schnelle direkte Unterstützung mit einer einmaligen Spende.',
        koFiSub: 'Spende über Ko-fi und hilf dem Projekt zu wachsen.',
        whyTitle: '🎭 Warum spenden?',
        whyLanguages: 'Deine Unterstützung finanziert neue Sprachen, Inhaltspacks und künftige Erweiterungen der Wortbank.',
        whyUpdates: 'Sie hilft auch, Pantomime Challenge mit Feinschliff, Balancing und neuen Funktionen aktuell zu halten.'
      },
      share: {
        title: 'Pantomime Challenge',
        text: 'Komm und spiel Pantomime Challenge mit mir!',
        footerAriaLabel: 'Pantomime Challenge teilen'
      },
      theme: { cosmic: 'Kosmisch', 'liquid-glass': 'Herbst', material3: 'Frühling', 'light-mode': 'Heller Modus', 'dark-mode': 'Dunkler Modus', 'high-contrast': 'Hoher Kontrast' },
      footer: { copyPrefix: '© 2025 Pantomime Challenge v0.1 · Insight X Lab Technologies' },
      teams: { defaultA: 'Team A', defaultB: 'Team B' },
      players: { defaultName: 'Spieler {number}' },
      dynamic: {
        roundDisplay: ({ current, total }) => `Runde ${current} von ${total}`,
        diffCount: ({ difficulty, count }) => `${difficulty} · ${count} Wörter verfügbar`,
        correctTeamPoints: ({ teamName, points }) => `+${points} Punkte für ${teamName}!`,
        correctPlayerPoints: ({ playerName, points }) => `+${points} Punkte für ${playerName}!`,
        guesserPoints: ({ playerName, points }) => `+${points} Punkte für den Ratenden: ${playerName}!`,
        correctWithGuesserPoints: ({ actorName, actorPoints, guesserName, guesserPoints }) => `+${actorPoints} für ${actorName} · +${guesserPoints} für ${guesserName}`,
        chooseGuesserPoints: ({ points }) => `Wähle aus, wer geraten hat, um +${points} Punkte zu erhalten.`,
        penaltySkip: ({ points }) => `-${points} Punkte (falsch/skip)`,
        penaltyApplied: ({ playerName, points }) => `-${points} Punkte für ${playerName}.`,
        timeUpPenalty: ({ playerName, points }) => `Zeit abgelaufen. -${points} Punkte für ${playerName}.`,
        timeUpNoPoints: 'Zeit abgelaufen! Keine Punkte.',
        skippedNoPoints: 'Wort übersprungen. Keine Punkte.',
        scoreManagerContext: ({ round, total, playerName }) => `Runde ${round} von ${total} · ${playerName} ist dran`,
        leaderboardSummary: ({ players, matches }) => `${players} Spieler · ${matches} Partie${matches !== 1 ? 'n' : ''}`,
        leaderboardModeStats: ({ points, matches }) => `${points} Pkt. · ${matches} Partie${matches !== 1 ? 'n' : ''}`,
        roundSummary: ({ roundDone, remaining }) => `Ende von Runde ${roundDone} — ${remaining} Runde${remaining !== 1 ? 'n' : ''} übrig!`,
        wordAdded: ({ word, difficulty }) => `✅ "${word}" hinzugefügt (${difficulty})!`,
        teamAdded: ({ name, teamName }) => `✅ ${name} ist in ${teamName}!`,
        playerAdded: ({ name }) => `✅ ${name} ist dabei!`,
        packInstalled: ({ name }) => `✅ Pack "${name}" installiert!`,
        packWordsSummary: ({ count }) => `${count} Wort${count !== 1 ? 'er' : ''}`,
        packVersion: ({ version }) => `v${version}`,
        challengeAdded: ({ challenge }) => `✅ Herausforderung "${challenge}" hinzugefügt!`
      },
      notifications: {
        duplicateWord: '⚠️ Wort existiert bereits!',
        duplicateChallenge: '⚠️ Herausforderung existiert bereits!',
        bankRestored: '✅ Wortbank wiederhergestellt!',
        challengeRemoved: 'Herausforderung entfernt.',
        challengesRestored: '✅ Herausforderungen wiederhergestellt!',
        leaderboardReset: '✅ Bestenliste gelöscht!',
        userIdCopied: '🪪 user_id kopiert!',
        userIdExported: '🪪 user_id-Backup exportiert!',
        userIdImported: '🪪 user_id wiederhergestellt!',
        userIdImportCancelled: 'Import abgebrochen.',
        packInstallReading: 'Datei wird gelesen...',
        packInstallSuccess: '✅ Pack installiert und aktiviert!',
        packInstallCancelled: 'Installation abgebrochen.',
        packRemoved: 'Pack entfernt.',
        packToggled: 'Pack-Status aktualisiert.',
        maxPlayers: '❌ Maximal 6 Spieler!',
        maxTeamPlayers: '❌ Maximal 3 pro Team!',
        minTeamPlayers: '❌ Mindestens 1 pro Team!',
        minFfaPlayers: '❌ Der 1-gegen-1-Modus braucht genau 2 Spieler!',
        maxFfaPlayers: '❌ Der 1-gegen-1-Modus erlaubt höchstens 2 Spieler!',
        donationLinkUnavailable: '⚠️ Konfiguriere den Spendenlink dieses Partners, um ihn zu aktivieren.',
        shareCopied: '🔗 Link kopiert!',
        shareUnavailable: '🔗 Link zum Teilen kopiert.',
        shareCopyFailed: '⚠️ Link konnte nicht kopiert werden.',
        shareInstagramFallback: '🔗 Link kopiert. In Instagram einfügen.',
        shareTikTokFallback: '🔗 Link kopiert. In TikTok einfügen.',
        fullscreenUnavailable: '⚠️ Vollbild ist in diesem Browser nicht verfügbar.'
      },
      confirmations: {
        resetWords: 'Standard-Wortbank wiederherstellen? Eigene Wörter gehen verloren.',
        resetChallenges: 'Standard-Herausforderungen wiederherstellen? Eigene Herausforderungen gehen verloren.',
        resetLeaderboard: 'Alle Ergebnisse aus der ewigen Bestenliste löschen?',
        resetAppDefaults: 'Die gesamte Anwendung auf Standard zurücksetzen? Einstellungen, gespeicherte Spieler, installierte Packs und user_id werden gelöscht.',
        replaceUserId: ({ currentUserId, importedUserId }) => `Aktuelle user_id (${currentUserId}) durch die importierte user_id (${importedUserId}) ersetzen? Nutze dies nur, um Käufe wiederherzustellen, die bereits für diese ID ausgestellt wurden.`,
        restartGame: 'Spiel neu starten? Der gesamte Fortschritt geht verloren.',
        replacePack: ({ packName }) => `Ein Pack mit dieser ID ist bereits installiert (${packName}). Ersetzen?`,
        removePack: ({ packName }) => `Pack "${packName}" von diesem Gerät entfernen?`
      },
      packErrors: {
        fileRequired: 'Wähle eine Pack-Datei aus.',
        invalidJson: 'Ungültige Datei. Lade ein Pack-JSON hoch.',
        invalidSchema: 'Ungültiges Pack-Schema.',
        invalidUser: 'Dieses Pack wurde für eine andere user_id ausgestellt.',
        invalidPackId: 'pack_id fehlt oder ist ungültig.',
        invalidAlgorithm: 'Ungültiger Signaturalgorithmus.',
        invalidSignature: 'Ungültige Signatur. Das Pack wurde nicht installiert.',
        invalidContentHash: 'Ungültiger Content-Hash.',
        emptyPack: 'Das Pack enthält keine gültigen Wörter oder Herausforderungen.',
        cryptoUnavailable: 'Dieser Browser unterstützt keine sichere Pack-Validierung.',
        reservedPackId: 'Diese pack_id ist für das Spiel reserviert.'
      },
      userIdErrors: {
        fileRequired: 'Wähle eine user_id-Datei aus.',
        invalidJson: 'Ungültige Datei. Lade ein user_id-JSON hoch.',
        invalidSchema: 'Diese Datei ist kein No-Laughing-Allowed-user_id-Backup.',
        invalidUserId: 'Die user_id in der Datei ist ungültig.'
      }
    });

    TRANSLATIONS.it = mergeTranslations(TRANSLATIONS.en, {
      meta: { documentTitle: 'Sfida di Mimica' },
      common: {
        back: '← Indietro',
        add: '+ Aggiungi',
        copy: 'Copia',
        continue: '▶️ Continua',
        restart: '🔄 Riavvia',
        home: '🏠 Home',
        playerSingular: 'giocatore',
        playerPlural: 'giocatori',
        roundSingular: 'turno',
        roundPlural: 'turni'
      },
      language: { pt: 'Portoghese', en: 'Inglese', es: 'Spagnolo', fr: 'Francese', de: 'Tedesco', it: 'Italiano' },
      dev: {
        mode: 'Modalità sviluppo',
        description: 'Prova rapidamente il layout su mobile, tablet e desktop.',
        previewLabel: 'Anteprima layout',
        preview: { auto: 'Auto', mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop' }
      },
      home: {
        title: 'Sfida di Mimica',
        subtitle: 'Disegna, Indovina e Divertiti in Famiglia',
        enterFullscreen: 'Schermo intero',
        exitFullscreen: 'Esci da schermo intero',
        newGame: '🎮 Nuova partita',
        multiDeviceGame: '📡 Connetti dispositivi',
        multiDeviceOnline: 'Online',
        multiDeviceOffline: 'Offline',
        multiDeviceSummary: ({ status, count }) => `${status} | ${count} dispositiv${count === 1 ? 'o' : 'i'} conness${count === 1 ? 'o' : 'i'}`,
        quickGame: '⚡ Partita rapida',
        wordBank: '🧩 Contenuti ed espansioni',
        donate: '❤️ Dona',
        settings: '⚙️ Impostazioni',
        leaderboard: '🏅 Classifica storica',
        installOnDevice: '📲 Installa sul dispositivo',
        howToTitle: '🏆 Come giocare',
        howTo: {
          setupTitle: 'Prepara la partita',
          setupDesc: 'Scegli squadre o tutti contro tutti, poi imposta turni, difficoltà e categorie.',
          turnTitle: 'Guarda e interpreta',
          turnDesc: 'Un giocatore vede la parola, la memorizza e la mima o la disegna mentre gli altri indovinano.',
          timerTitle: 'Corri contro il tempo',
          timerDesc: 'Timer, suggerimenti e suoni di avviso rendono ogni turno rapido e divertente.',
          winTitle: 'Fai punti e vinci',
          winDesc: 'Ogni risposta corretta vale 10 punti. Alla fine dei turni, il punteggio decide il vincitore.'
        }
      },
      multiDevice: {
        title: 'Partita multi-device',
        chooseTitle: 'Cosa vuoi fare?',
        chooseDesc: 'Apri una sessione per controllare la partita o collega questo dispositivo come schermo ausiliario.',
        chooseHost: '📡 Apri una sessione',
        chooseJoin: '🔗 Entra in una sessione',
        changeChoice: 'Cambia opzione',
        hostTitle: '📡 Apri sessione',
        hostDesc: 'Questo dispositivo controlla la partita. Gli altri entrano per vedere timer, suggerimenti e disegno.',
        openSession: 'Apri sessione',
        hostCreating: 'Creazione sessione...',
        hostReady: 'Sessione aperta. Scansiona il QR Code sugli altri dispositivi.',
        hostError: 'Impossibile aprire la sessione.',
        sessionCode: 'Codice sessione:',
        guestsConnected: ({ count }) => `${count} dispositiv${count !== 1 ? 'i' : 'o'} conness${count !== 1 ? 'i' : 'o'}`,
        online: 'Online',
        offline: 'Offline',
        continueSetup: 'Continua configurazione',
        joinTitle: '🔗 Connetti',
        joinDesc: 'Entra come schermo ausiliario per seguire la partita dell’host.',
        joinCodeLabel: 'Codice o link della sessione',
        joinCodePlaceholder: 'Incolla codice o link',
        joinSession: 'Connetti alla sessione',
        joinHelp: 'Puoi anche scansionare il QR Code mostrato sull’host.',
        waitingTitle: 'In attesa dei dati della partita',
        guestLabel: 'Schermo ausiliario',
        connecting: 'Connessione...',
        connected: 'Connesso',
        disconnected: 'Disconnesso',
        guestWaiting: 'In attesa che l’host inizi la partita.',
        guestPreparing: 'In attesa che l’host prepari il turno.',
        guestMemorizing: 'Preparati! La battuta apparirà tra poco.',
        guestPlaying: 'Indovinate!',
        guestScore: 'In attesa del prossimo turno.',
        guestFinal: 'Partita terminata.',
        liveDrawing: '✏️ Disegno live',
        disconnect: 'Disconnetti',
        linkCopied: '🔗 Link della sessione copiato!',
        missingSession: 'Inserisci il codice della sessione.',
        peerUnavailable: 'PeerJS non è stato caricato. Controlla la connessione e riprova.',
        qrUnavailable: 'QR Code non disponibile. Usa il link o il codice della sessione.'
      },
      setup: {
        title: 'Nuova partita',
        gameTypeTitle: '1️⃣ Tipo di gioco',
        gameTypeMimeName: 'Mimica',
        gameTypeMimeDesc: 'Recita senza parlare',
        gameTypeDrawingName: 'Disegno',
        gameTypeDrawingDesc: 'Disegna la parola',
        modeTitle: '2️⃣ Modalità di gioco',
        modeTeamsName: 'Due squadre',
        modeTeamsDesc: 'Le squadre competono',
        modeFfaName: 'Tutti contro tutti',
        modeFfaDesc: 'Ognuno per sé',
        teamPlayersTitle: '3️⃣ Giocatori per squadra',
        playersTitle: '2️⃣ Giocatori',
        teamAPlaceholder: 'Nome squadra A',
        teamBPlaceholder: 'Nome squadra B',
        playerNamePlaceholder: 'Nome giocatore...',
        teamHelper: '💡 Minimo 1 per squadra, massimo 3 per squadra (fino a 6 giocatori)',
        ffaHelper: '💡 Esattamente 2 giocatori',
        difficultyTitle: '4️⃣ Difficoltà',
        difficultyEasyDesc: 'Ottimo per bambini e principianti',
        difficultyNormalDesc: 'Sfida equilibrata per tutta la famiglia',
        difficultyHardDesc: 'Parole complesse, per i coraggiosi!',
        optionsTitle: '5️⃣ Opzioni di gioco',
        randomChallengeLabel: 'Sfida casuale',
        randomChallengeSub: 'Aggiunge modificatori alla mimica',
        randomChallengeDisabledSub: 'Non disponibile in modalità disegno',
        categoriesLabel: 'Categorie disponibili',
        coreCategoriesLabel: 'Categorie core',
        premiumCategoriesLabel: 'Categorie premium',
        matchTitle: '6️⃣ Configura partita',
        roundsLabel: 'Numero di turni',
        roundsSub: 'Quanti turni per giocatore',
        startGame: '🎭 Inizia il gioco!'
      },
      difficulty: { easy: 'Facile', normal: 'Normale', hard: 'Difficile' },
      category: {
        objects: { plural: 'Oggetti', singular: 'Oggetto', tab: '🧸 Oggetti', option: '🧸 Oggetti' },
        actions: { plural: 'Azioni', singular: 'Azione', tab: '🏃 Azioni', option: '🏃 Azioni' },
        animals: { plural: 'Animali', singular: 'Animale', tab: '🐾 Animali', option: '🐾 Animali' },
        movies: { plural: 'Film', singular: 'Film', tab: '🎬 Film', option: '🎬 Film' },
        professions: { plural: 'Professioni', singular: 'Professione', tab: '👔 Professioni', option: '👔 Professioni' },
        celebrities: { plural: 'Celebrità', singular: 'Celebrità', tab: '⭐ Celebrità', option: '⭐ Celebrità' }
      },
      game: {
        currentPlayerLabel: 'Turno di fare la mimica:',
        currentPlayerDrawingLabel: 'Turno di disegnare:',
        readyTitle: 'Pronti a vedere la parola?',
        readyDrawingTitle: 'Pronti a vedere cosa disegnare?',
        readySub: 'Solo chi mima deve guardare! Gli altri chiudano gli occhi! 👀',
        readyDrawingSub: 'Solo chi disegna deve guardare! Gli altri chiudano gli occhi! 👀',
        revealWord: '🎲 Rivela parola',
        memorizeTitle: '⚡ Preparati!',
        startsIn: 'La battuta appare tra...',
        onlyMimeCanSee: 'Solo chi mima può vedere!',
        onlyDrawerCanSee: 'Solo chi disegna può vedere!',
        secondsLabel: 'SECONDI',
        hiddenWord: 'Parola nascosta',
        hintTitle: '💡 Suggerimento',
        showWord: '👁️ Mostra parola',
        hideWord: '🙈 Nascondi parola',
        correct: '✅ Corretto!',
        wrong: '❌ Sbagliato / Skip',
        challengePrefix: '🎯 Sfida:'
      },
      drawing: {
        canvasLabel: 'Area di disegno',
        toolbarLabel: 'Strumenti di disegno',
        penThick: 'Linea spessa',
        penThin: 'Linea sottile',
        eraserThick: 'Gomma grande',
        eraserThin: 'Gomma piccola',
        clear: 'Pulisci canvas'
      },
      result: {
        correctTitle: 'Corretto!',
        wrongTitle: 'Sbagliato!',
        timeUpTitle: 'Tempo scaduto!',
        guesserLabel: 'Chi ha indovinato?',
        guesserPlaceholder: 'Seleziona chi ha indovinato',
        nextTurn: '➡️ Prossimo turno'
      },
      scoreManager: {
        manageButton: '⚖️ Gestisci',
        title: 'Gestisci punteggio',
        backToGame: '← Torna al gioco',
        currentScoreTitle: 'Punteggio attuale',
        resetInputs: '↺ Ricarica',
        saveAndReturn: 'Salva e torna'
      },
      score: { title: '🏆 Punteggio', nextRoundTitle: '🎊 Prossimo turno' },
      final: { winnerLabel: 'VINCITORE!', resultTitle: '📊 Risultato finale', playAgain: '🎮 Gioca ancora', tie: 'PAREGGIO!' },
      leaderboard: {
        title: 'Classifica storica',
        sortLabel: 'Ordina per',
        sortSub: 'Confronta punti totali, partite o modalità specifiche.',
        resetButton: 'Cancella risultati',
        listTitle: 'Giocatori',
        emptyState: 'Nessun risultato salvato per ora.',
        pointsLabel: 'punti',
        matchesLabel: 'partite',
        sort: {
          total: 'Punti totali',
          matches: 'Partite',
          mimeTeams: 'Mimica · Squadre',
          mimeFfa: 'Mimica · Tutti contro tutti',
          drawingTeams: 'Disegno · Squadre',
          drawingFfa: 'Disegno · Tutti contro tutti',
          name: 'Nome'
        },
        mode: {
          mimeTeams: 'Mimica · Squadre',
          mimeFfa: 'Mimica · Tutti contro tutti',
          drawingTeams: 'Disegno · Squadre',
          drawingFfa: 'Disegno · Tutti contro tutti'
        }
      },
      wordbank: {
        title: 'Contenuti ed espansioni',
        addTitle: '➕ Aggiungi parola',
        newWordPlaceholder: 'Digita la parola...',
        addCategoryHint: 'Sarà aggiunta alla categoria selezionata.',
        addButton: '➕ Aggiungi parola',
        listTitle: '📋 Parole',
        resetButton: '↺ Ripristina',
        challengesTitle: '🎯 Sfide core',
        addChallengeTitle: '🎯 Aggiungi sfida',
        newChallengePlaceholder: 'Digita la sfida...',
        addChallengeButton: '➕ Aggiungi sfida',
        installPackTitle: '📦 Installa pack',
        installPackSub: 'Carica il file .json acquistato per sbloccare nuove parole su questo dispositivo.',
        selectPackFile: '📁 Scegli file',
        installedPacksTitle: 'Pack installati',
        noInstalledPacks: 'Nessun pack extra installato.',
        packEnabled: 'Attivo',
        packDisabled: 'Inattivo',
        removePack: 'Rimuovi',
        packPreviewTitle: '⭐ Contenuto del pack',
        packPreviewPrompt: 'Clicca su un pack installato per vedere parole e sfide.',
        packPreviewWordsTitle: 'Parole del pack',
        packPreviewChallengesTitle: 'Sfide del pack',
        packPreviewNoWords: 'Nessuna parola in questa lingua e difficoltà.',
        packPreviewNoChallenges: 'Nessuna sfida in questa lingua.',
        packPreviewSelected: ({ name }) => `Mostrando: ${name}`
      },
      settings: {
        title: 'Impostazioni',
        timerTitle: '⏱️ Timer',
        roundTimeLabel: 'Tempo per turno',
        roundTimeSub: 'Secondi per indovinare',
        prepareTimeLabel: 'Tempo di Preparazione',
        prepareTimeSub: 'Secondi prima che appaia la battuta',
        penaltyLabel: 'Penalità per skip',
        penaltySub: '−10 punti quando si passa',
        correctPointsLabel: 'Punti per risata',
        correctPointsSub: 'Punti per chi fa ridere l’altra parte',
        wrongPenaltyPointsLabel: 'Punti persi per non ridere',
        wrongPenaltyPointsSub: 'Sottrae punti quando nessuno ride o finisce il tempo',
        ffaGuesserPointsLabel: 'Punti per chi indovina (FFA)',
        ffaGuesserPointsSub: 'In Tutti contro tutti, scegli chi ha indovinato dopo ogni risposta corretta',
        ffaGuesserPointsValueLabel: 'Punti di chi ha indovinato',
        ffaGuesserPointsValueSub: 'Valore iniziale predefinito: 5 punti',
        generalTitle: '⚙️ Impostazioni generali',
        languageLabel: 'Lingua',
        languageSub: 'Cambia l’interfaccia e i contenuti disponibili nel gioco',
        alertSoundLabel: 'Suono di avviso',
        alertSoundSub: 'Bip negli ultimi 10 secondi',
        navigationSoundLabel: 'Suono di navigazione',
        navigationSoundSub: 'Suono al clic sui pulsanti dell’interfaccia',
        gameroomMusicLabel: 'Musica dei menu',
        gameroomMusicSub: 'Riprodotta su home, configurazione e impostazioni',
        gameplayMusicLabel: 'Musica di gioco',
        gameplayMusicSub: 'Riprodotta durante preparazione, timer e punteggi',
        userIdTitle: '🪪 ID di acquisto',
        userIdLabel: 'Il tuo user_id',
        userIdSub: 'Usa questo codice quando acquisti pack, così il file viene emesso per questo dispositivo.',
        copyUserId: 'Copia',
        userIdBackupSub: 'Esporta un backup per ripristinare questo user_id dopo aver cambiato browser o ripristinato l’applicazione.',
        exportUserIdButton: 'Esporta user_id',
        importUserIdButton: 'Importa user_id',
        wordsTitle: '🎲 Parole',
        shuffleWordsLabel: 'Mescola parole',
        shuffleWordsSub: 'Ordine casuale a ogni partita',
        appearanceTitle: '🎨 Aspetto',
        themeLabel: 'Tema visivo',
        themeSub: 'Cambia colori, trasparenze e tipografia dell’interfaccia',
        resetAllTitle: '🧹 Ripristina applicazione',
        resetAllSub: 'Rimuove impostazioni, giocatori salvati, pack installati e user_id di questo dispositivo.',
        resetAllButton: 'Ripristina tutto'
      },
      donate: {
        title: 'Sostieni Sfida di Mimica',
        chooseTitle: '❤️ Scegli come donare',
        subtitle: 'Scegli la piattaforma preferita per sostenere il gioco e finanziare nuovi pack di parole, lingue e miglioramenti.',
        buyMeCoffeeSub: 'Supporto rapido e diretto con una donazione singola.',
        koFiSub: 'Dona via Ko-fi e aiuta il progetto a crescere.',
        whyTitle: '🎭 Perché donare?',
        whyLanguages: 'Il tuo supporto aiuta a finanziare nuove lingue, pack di contenuti e future espansioni della banca delle parole.',
        whyUpdates: 'Aiuta anche a mantenere Sfida di Mimica aggiornata con rifiniture, bilanciamento e nuove funzionalità.'
      },
      share: {
        title: 'Sfida di Mimica',
        text: 'Vieni a giocare a Sfida di Mimica con me!',
        footerAriaLabel: 'Condividi Sfida di Mimica'
      },
      theme: { cosmic: 'Cosmico', 'liquid-glass': 'Autunno', material3: 'Primavera', 'light-mode': 'Modalità chiara', 'dark-mode': 'Modalità scura', 'high-contrast': 'Alto contrasto' },
      footer: { copyPrefix: '© 2025 Sfida di Mimica v0.1 · Insight X Lab Technologies' },
      teams: { defaultA: 'Squadra A', defaultB: 'Squadra B' },
      players: { defaultName: 'Giocatore {number}' },
      dynamic: {
        roundDisplay: ({ current, total }) => `Turno ${current} di ${total}`,
        diffCount: ({ difficulty, count }) => `${difficulty} · ${count} parole disponibili`,
        correctTeamPoints: ({ teamName, points }) => `+${points} punti per ${teamName}!`,
        correctPlayerPoints: ({ playerName, points }) => `+${points} punti per ${playerName}!`,
        guesserPoints: ({ playerName, points }) => `+${points} punti per chi ha indovinato: ${playerName}!`,
        correctWithGuesserPoints: ({ actorName, actorPoints, guesserName, guesserPoints }) => `+${actorPoints} per ${actorName} · +${guesserPoints} per ${guesserName}`,
        chooseGuesserPoints: ({ points }) => `Seleziona chi ha indovinato per ricevere +${points} punti.`,
        penaltySkip: ({ points }) => `-${points} punti (errore/skip)`,
        penaltyApplied: ({ playerName, points }) => `-${points} punti per ${playerName}.`,
        timeUpPenalty: ({ playerName, points }) => `Tempo scaduto. -${points} punti per ${playerName}.`,
        timeUpNoPoints: 'Tempo scaduto! Nessun punto.',
        skippedNoPoints: 'Parola saltata. Nessun punto.',
        scoreManagerContext: ({ round, total, playerName }) => `Turno ${round} di ${total} · Tocca a ${playerName}`,
        leaderboardSummary: ({ players, matches }) => `${players} giocator${players !== 1 ? 'i' : 'e'} · ${matches} partit${matches !== 1 ? 'e' : 'a'}`,
        leaderboardModeStats: ({ points, matches }) => `${points} pt · ${matches} partit${matches !== 1 ? 'e' : 'a'}`,
        roundSummary: ({ roundDone, remaining }) => `Fine del turno ${roundDone} — ${remaining} turn${remaining !== 1 ? 'i' : 'o'} restant${remaining !== 1 ? 'i' : 'e'}!`,
        wordAdded: ({ word, difficulty }) => `✅ "${word}" aggiunta (${difficulty})!`,
        teamAdded: ({ name, teamName }) => `✅ ${name} in ${teamName}!`,
        playerAdded: ({ name }) => `✅ ${name} è entrato!`,
        packInstalled: ({ name }) => `✅ Pack "${name}" installato!`,
        packWordsSummary: ({ count }) => `${count} parol${count !== 1 ? 'e' : 'a'}`,
        packVersion: ({ version }) => `v${version}`,
        challengeAdded: ({ challenge }) => `✅ Sfida "${challenge}" aggiunta!`
      },
      notifications: {
        duplicateWord: '⚠️ La parola esiste già!',
        duplicateChallenge: '⚠️ La sfida esiste già!',
        bankRestored: '✅ Banca delle parole ripristinata!',
        challengeRemoved: 'Sfida rimossa.',
        challengesRestored: '✅ Sfide ripristinate!',
        leaderboardReset: '✅ Classifica cancellata!',
        userIdCopied: '🪪 user_id copiato!',
        userIdExported: '🪪 Backup dello user_id esportato!',
        userIdImported: '🪪 user_id ripristinato!',
        userIdImportCancelled: 'Importazione annullata.',
        packInstallReading: 'Lettura file...',
        packInstallSuccess: '✅ Pack installato e attivato!',
        packInstallCancelled: 'Installazione annullata.',
        packRemoved: 'Pack rimosso.',
        packToggled: 'Stato del pack aggiornato.',
        maxPlayers: '❌ Massimo 6 giocatori!',
        maxTeamPlayers: '❌ Massimo 3 per squadra!',
        minTeamPlayers: '❌ Minimo 1 per squadra!',
        minFfaPlayers: '❌ La modalità 1 contro 1 richiede esattamente 2 giocatori!',
        maxFfaPlayers: '❌ La modalità 1 contro 1 accetta al massimo 2 giocatori!',
        donationLinkUnavailable: '⚠️ Configura il link di donazione di questo partner per attivarlo.',
        shareCopied: '🔗 Link copiato!',
        shareUnavailable: '🔗 Link copiato per la condivisione.',
        shareCopyFailed: '⚠️ Impossibile copiare il link.',
        shareInstagramFallback: '🔗 Link copiato. Incollalo su Instagram.',
        shareTikTokFallback: '🔗 Link copiato. Incollalo su TikTok.',
        fullscreenUnavailable: '⚠️ Schermo intero non disponibile in questo browser.'
      },
      confirmations: {
        resetWords: 'Ripristinare il banco parole predefinito? Le parole personalizzate andranno perse.',
        resetChallenges: 'Ripristinare le sfide predefinite? Le sfide personalizzate andranno perse.',
        resetLeaderboard: 'Cancellare tutti i risultati della classifica storica?',
        resetAppDefaults: 'Ripristinare tutta l’applicazione ai valori predefiniti? Impostazioni, giocatori salvati, pack installati e user_id saranno cancellati.',
        replaceUserId: ({ currentUserId, importedUserId }) => `Sostituire lo user_id attuale (${currentUserId}) con lo user_id importato (${importedUserId})? Usalo solo per ripristinare acquisti già emessi per questo ID.`,
        restartGame: 'Riavviare il gioco? Tutti i progressi andranno persi.',
        replacePack: ({ packName }) => `Esiste già un pack installato con questo ID (${packName}). Sostituirlo?`,
        removePack: ({ packName }) => `Rimuovere il pack "${packName}" da questo dispositivo?`
      },
      packErrors: {
        fileRequired: 'Seleziona un file pack.',
        invalidJson: 'File non valido. Carica un JSON di pack.',
        invalidSchema: 'Schema del pack non valido.',
        invalidUser: 'Questo pack è stato emesso per un altro user_id.',
        invalidPackId: 'pack_id mancante o non valido.',
        invalidAlgorithm: 'Algoritmo di firma non valido.',
        invalidSignature: 'Firma non valida. Il pack non è stato installato.',
        invalidContentHash: 'Hash del contenuto non valido.',
        emptyPack: 'Il pack non contiene parole o sfide valide.',
        cryptoUnavailable: 'Questo browser non supporta la validazione sicura dei pack.',
        reservedPackId: 'Questo pack_id è riservato dal gioco.'
      },
      userIdErrors: {
        fileRequired: 'Seleziona un file user_id.',
        invalidJson: 'File non valido. Carica un JSON di user_id.',
        invalidSchema: 'Questo file non è un backup user_id di No Laughing Allowed.',
        invalidUserId: 'Lo user_id nel file non è valido.'
      }
    });

    function t(key, params = {}, language = currentLanguage) {
      const value =
        getNestedValue(TRANSLATIONS[language], key)
        ?? getNestedValue(TRANSLATIONS[DEFAULT_LANGUAGE], key)
        ?? key;
      if (typeof value === 'function') return value(params);
      return String(value).replace(/\{(\w+)\}/g, (_, token) => params[token] ?? `{${token}}`);
    }

    function createEmptyJokeBank() {
      return CATEGORY_KEYS.reduce((acc, cat) => {
        acc[cat] = [];
        return acc;
      }, {});
    }

    function createEmptyWordBank() {
      return DIFFICULTY_KEYS.reduce((acc, diff) => {
        acc[diff] = CATEGORY_KEYS.reduce((catAcc, cat) => {
          catAcc[cat] = [];
          return catAcc;
        }, {});
        return acc;
      }, {});
    }

    function buildJokeIdFromText(text = '') {
      return String(text)
        .toLocaleLowerCase('pt-BR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 72) || `joke-${Date.now()}`;
    }

    function getJokeText(entry) {
      if (typeof entry === 'string') return entry.trim();
      if (!entry || typeof entry !== 'object') return '';
      return String(entry.text || entry.joke || entry.value || '').trim();
    }

    function normalizeJokeEntry(entry, fallbackId = '') {
      const text = getJokeText(entry);
      if (!text) return null;
      return {
        id: String(entry?.id || fallbackId || buildJokeIdFromText(text)).trim() || buildJokeIdFromText(text),
        text,
        tone: String(entry?.tone || '').trim(),
        source: String(entry?.source || '').trim()
      };
    }

    function normalizeJokeList(list) {
      const seen = new Set();
      const normalized = [];
      (Array.isArray(list) ? list : []).forEach((entry, index) => {
        const joke = normalizeJokeEntry(entry, `joke-${index + 1}`);
        if (!joke) return;
        const dedupeKey = joke.text.toLocaleLowerCase('pt-BR');
        if (seen.has(dedupeKey)) return;
        seen.add(dedupeKey);
        normalized.push(joke);
      });
      return normalized;
    }

    function normalizeJokeBank(bank) {
      const normalized = createEmptyJokeBank();
      CATEGORY_KEYS.forEach(category => {
        normalized[category] = normalizeJokeList(bank?.[category] || []);
      });
      return normalized;
    }

    function createLegacyWordBankFromJokeBank(bank = {}) {
      const normalizedJokes = normalizeJokeBank(bank);
      const legacyBank = createEmptyWordBank();
      DIFFICULTY_KEYS.forEach(diff => {
        CATEGORY_KEYS.forEach(category => {
          legacyBank[diff][category] = normalizedJokes[category].map(joke => joke.text);
        });
      });
      return legacyBank;
    }

    function getMigratedJokeCategoryFromLegacy(category = '') {
      const mapping = {
        objects: 'cotidiano',
        actions: 'cotidiano',
        animals: 'absurdo',
        movies: 'familia',
        professions: 'escola_trabalho',
        celebrities: 'tiozao'
      };
      return mapping[category] || 'cotidiano';
    }

    function convertLegacyWordBankToJokeBank(bank = {}) {
      const normalized = createEmptyJokeBank();
      LEGACY_WORD_CATEGORY_KEYS.forEach(category => {
        const targetCategory = getMigratedJokeCategoryFromLegacy(category);
        DIFFICULTY_KEYS.forEach(diff => {
          const words = Array.isArray(bank?.[diff]?.[category]) ? bank[diff][category] : [];
          words.forEach((word, index) => {
            const joke = normalizeJokeEntry(word, `${targetCategory}-${diff}-${index + 1}`);
            if (joke) normalized[targetCategory].push(joke);
          });
        });
      });
      return normalizeJokeBank(normalized);
    }

    function normalizeChallenges(list) {
      return Array.isArray(list)
        ? list.map(item => String(item).trim()).filter(Boolean)
        : [];
    }

    // ============================================================
    // DEFAULT JOKE BANK — core content pack
    // ============================================================
    const DEFAULT_JOKES_PT = {
      trocadilhos: [
        'Por que o calendário ficou nervoso? Porque os dias dele estavam contados.',
        'Por que o peixe foi ao médico? Porque o doutor mandou ele ficar com nada de preocupações.',
        'Por que a impressora foi ao psicólogo? Porque estava cheia de papelada emocional.',
        'Por que o café brigou com o açúcar? Porque a relação estava muito amarga.',
        'Por que a lâmpada terminou o namoro? Porque precisava de um tempo para clarear as ideias.',
        'Por que o pão entrou na academia? Porque queria ficar com o miolo definido.',
        'Por que o relógio foi demitido? Porque só fazia hora extra.',
        'Por que a nuvem abriu uma empresa? Porque queria fazer chover ideias.',
        'Por que o lápis pediu férias? Porque estava sem ponta para lidar com tudo.',
        'Por que o espelho não foi à festa? Porque não se vê nessas situações.',
        'Por que a bateria da banda saiu primeiro? Porque estava sem energia social.',
        'Por que o elevador ficou triste? Porque vivia tendo altos e baixos.',
        'Por que o sapato virou coach? Porque só sabia falar em dar passos firmes.',
        'Por que a escada ficou famosa? Porque sempre soube subir na vida.',
        'Por que o garfo terminou o curso? Porque finalmente encontrou seu ponto.',
        'Por que o chão pediu respeito? Porque estava sendo passado para trás.',
        'Por que a toalha foi promovida? Porque secava qualquer problema.',
        'Por que o travesseiro abriu consultório? Porque entende de casos pesados.',
        'Por que a tomada terminou o namoro? Porque a conexão não era mais a mesma.',
        'Por que o bolo foi ao terapeuta? Porque tinha muitas camadas.',
        'Por que a mochila ficou ofendida? Porque sempre jogavam tudo nas costas dela.',
        'Por que a abelha ficou rica? Porque sabia fazer render o negócio.',
        'Por que o botão pediu demissão? Porque vivia sob pressão.',
        'Por que a panela fez amizade com o fogo? Porque a relação esquentou rápido.',
        'Por que o chinelo perdeu a discussão? Porque não tinha sola para argumentar.',
        'Por que a borracha ficou confusa? Porque tentava apagar o passado.',
        'Por que o caderno virou terapeuta? Porque sabia ouvir uma folha inteira de problemas.',
        'Por que a tesoura foi promovida? Porque cortava caminho sem perder a classe.',
        'Por que a caneca se sentiu importante? Porque sempre carregava o café nas costas.',
        'Por que o ventilador virou cantor? Porque adorava soltar refrão no ar.',
        'Por que a janela ficou corada? Porque ouviu a conversa e ficou sem vidro na cara.',
        'Por que o guarda-chuva abriu falência? Porque só lucrava em tempo fechado.',
        'Por que a meia foi ao encontro? Porque queria achar seu par ideal.',
        'Por que o teclado se estressou? Porque tinha muita tecla para apertar.',
        'Por que o sofá não discutia? Porque preferia deixar tudo mais macio.',
        'Por que a geladeira era boa conselheira? Porque sempre ajudava a esfriar a cabeça.',
        'Por que o liquidificador foi expulso da festa? Porque só sabia bater papo.',
        'Por que o copo foi ao dentista? Porque estava com uma rachadura no sorriso.',
        'Por que a régua era respeitada? Porque colocava limites em qualquer assunto.',
        'Por que o abajur era otimista? Porque vivia procurando um lado mais claro.',
        'Por que a vassoura ficou solteira? Porque varria todo mundo da vida dela.',
        'Por que o parafuso se deu bem no trabalho? Porque se encaixava em qualquer projeto.',
        'Por que a almofada virou influenciadora? Porque sabia apoiar todas as causas.',
        'Por que o microfone não guardava segredo? Porque sempre amplificava tudo.',
        'Por que a agenda se emocionou? Porque tinha muitos compromissos com o futuro.',
        'Por que o cabide era tão confiante? Porque sustentava qualquer look.',
        'Por que o sabonete evitava fofoca? Porque não queria se meter em roupa suja.',
        'Por que o tapete era zen? Porque já estava acostumado a ser pisado e seguir firme.',
        'Por que a colher foi contratada? Porque mexia com a equipe inteira.',
        'Por que o capacete era tão centrado? Porque protegia bem as próprias ideias.',
        'Por que a lata contou piada? Porque queria descontrair o ambiente.',
        'Por que o desodorante virou palestrante? Porque sabia como manter o público sem suor frio.',
        'Por que a torneira foi fazer terapia? Porque não aguentava mais engolir tudo a seco.',
        'Por que o cofre ficou vaidoso? Porque finalmente encontrou seu valor interior.',
        'Por que o quadro branco evitava brigas? Porque preferia apagar o assunto.',
        'Por que a lixeira se sentia injustiçada? Porque jogavam nela até os problemas dos outros.',
        'Por que o espremedor abriu consultoria? Porque sabia tirar o melhor de cada situação.',
        'Por que a escova de cabelo virou mediadora? Porque desembaraçava qualquer conflito.',
        'Por que o prendedor de roupa ganhou prêmio? Porque segurava a barra como ninguém.',
        'Por que o cadeado ficou desconfiado? Porque vivia cercado de segredos.',
        'Por que a campainha se achava popular? Porque todo mundo fazia questão de tocar nela.',
        'Por que o coador era tão paciente? Porque deixava as coisas passarem no tempo certo.',
        'Por que a garrafa térmica era respeitada? Porque mantinha a postura em qualquer clima.',
        'Por que o rodo ficou orgulhoso? Porque limpava a situação sem passar pano.',
        'Por que o clipe subiu na carreira? Porque sabia prender a atenção da chefia.',
        'Por que a fita adesiva era carinhosa? Porque se apegava muito fácil.',
        'Por que o despertador abriu academia? Porque adorava botar todo mundo para acordar para a vida.',
        'Por que o molho de tomate entrou na política? Porque prometia mais consistência no prato.',
        'Por que o filtro de café era discreto? Porque não gostava de aparecer mais do que o necessário.',
        'Por que a trena foi promovida? Porque media bem as consequências.',
        'Por que o ímã era carismático? Porque atraía boas conversas.',
        'Por que o ralador virou crítico? Porque gostava de deixar tudo bem afiado.',
        'Por que a caixinha de fósforo parecia confiante? Porque sabia acender qualquer ideia.',
        'Por que o varal se deu bem nas relações? Porque sabia dar espaço sem perder a conexão.',
        'Por que o zíper era confiável? Porque sabia exatamente a hora de fechar a questão.'
      ],
      tiozao: [
        'Qual é o café mais perigoso do mundo? O ex-presso.',
        'Sabe por que o livro de matemática se separou? Porque tinha muitos problemas.',
        'O que o tomate foi fazer no banco? Tirar extrato.',
        'Qual é o cúmulo da rapidez? Fechar a geladeira antes da luz apagar.',
        'O que o zero disse para o oito? Belo cinto.',
        'Por que o computador foi ao médico? Porque pegou um vírus.',
        'Qual é o animal mais antigo? A zebra, porque é em preto e branco.',
        'O que o celular falou para o carregador? Você completa a minha vida.',
        'Qual é a fruta que anda de trem? O kiwiiiii.',
        'O que a parede falou para a outra? Nos encontramos na esquina.',
        'Qual é o rei dos queijos? O reiqueijão.',
        'O que o biscoito disse para o outro? A vida é um sopro.',
        'Por que o pinheiro não se perde? Porque ele tem uma pinha.',
        'Qual é o cúmulo da distração? Procurar o óculos estando de óculos.',
        'O que o gelo disse para a água? Você me deixa derretido.',
        'Qual é o peixe que caiu do décimo andar? Aaaaatum.',
        'Por que o boi foi para a academia? Para ficar musculoso.',
        'O que o livro falou para a estante? Estou cheio de histórias.',
        'Qual é o doce favorito do átomo? Pé de moléque.',
        'O que o semáforo disse para o carro? Não me olhe, estou trocando.',
        'Qual é a cidade mais brincalhona? Ri-de-Janeiro.',
        'Por que a abelha sempre usa gel? Porque o cabelo dela é um enxame.',
        'O que a vaca foi fazer no espaço? Procurar o vácuo.',
        'Qual é a ferramenta que se acha? O alicate.',
        'Por que a laranja atendeu o telefone? Porque era uma chamada a cobrar.',
        'O que o milho falou para a pipoca? Você anda tão estourada.',
        'Qual é o contrário de volátil? Vem cá sobrinho.',
        'O que o pneu falou para o carro? Estou redondo de tanto rodar com você.',
        'Por que o lápis não se perdeu? Porque tinha um bom ponto de vista.',
        'Qual é o exame favorito do pão? A ressonância de miolo.',
        'O que a banana suicida falou? Macacos me mordam.',
        'Por que o jacaré tirou o filho da escola? Porque ele réptil de ano.',
        'Qual é o carro que cabe no bolso? O Fiat uno de cada vez.',
        'O que a impressora falou para o papel? Essa relação vai dar impressão.',
        'Por que o relógio foi preso? Porque matou o tempo.',
        'Qual é o cereal mais brincalhão? O arroz zoto.',
        'O que a chave falou para a fechadura? Nossa relação sempre abre portas.',
        'Por que a bola foi ao dentista? Porque estava com a rede cheia de buracos.',
        'Qual é o cúmulo da economia? Usar o outro lado do palito de dente.',
        'O que o pato disse para a pata? Vem quá.',
        'Por que o sorvete não usa elevador? Porque prefere uma sobremesa mais gelada.',
        'Qual é o nome da filha do japonês que caiu da bicicleta? Jaspiona.',
        'O que o café disse para o leite? Sem você eu não funciono direito.',
        'Por que a bicicleta não levantou da cama? Porque estava duas-tirada.',
        'Qual é o peixe que adora academia? O salmão maromba.',
        'O que o arroz falou para o feijão? Se gruda em mim que hoje tem química.',
        'Por que o fantasma entrou na dieta? Porque estava de corpo presente demais.',
        'Qual é a ave que mais reclama? O urubu-mingão do trânsito.',
        'O que a cebola disse para o cozinheiro? Se me cortar, você chora.',
        'Por que o shampoo foi ao bar? Porque queria uma saideira com condicionador.',
        'Qual é o doce mais educado? O bombom dia.',
        'Qual é o cúmulo da paciência? Esperar a pipoca estourar uma por uma.',
        'O que o padeiro falou quando ficou rico? Agora sim estou com a mão na massa.',
        'Qual é o peixe que trabalha com tecnologia? O beta tester.',
        'Por que o ovo foi ao stand-up? Porque queria quebrar o gelo.',
        'O que a impressora falou no casamento? Eu os declaro bem impressos.',
        'Qual é o animal que sempre repete tudo? O papagaio, porque já nasce no modo eco.',
        'O que o relógio faz quando está com fome? Pede segundo prato.',
        'Qual é a sobremesa preferida do pedreiro? O pavê.',
        'Por que o fósforo não faz faculdade? Porque já sai queimado.',
        'O que a torneira falou para o cano? Nossa amizade é de pressão.',
        'Qual é a matéria favorita da régua? A que tem mais medida.',
        'O que o milho falou na formatura? Agora eu estou pipocando de emoção.',
        'Por que o ventilador não conta segredo? Porque espalha tudo.',
        'Qual é o remédio favorito do tomate? O extrato.',
        'O que o travesseiro falou no escritório? Preciso de um descanso remunerado.',
        'Por que a moeda foi para a aula? Porque queria valer mais.',
        'Qual é o cúmulo da limpeza? Lavar a louça para sujar só um copo depois.',
        'O que a panela disse para a tampa? Você me completa por cima.',
        'Por que a escada foi ao psicólogo? Porque estava se sentindo para baixo.',
        'Qual é o carro favorito do eletricista? O choquewagen.',
        'O que o shampoo disse para o condicionador? Nossa relação está de cabelo em pé.',
        'Por que o livro de receitas tirou férias? Porque estava de saco cheio de virar página.',
        'Qual é o cúmulo da sorte? Cair de costas e achar dinheiro no bolso.',
        'O que o lápis falou para o apontador? Nossa relação sempre chega ao ponto.'
      ],
      cotidiano: [
        'Por que a geladeira sussurrou de madrugada? Porque eu entrei tão silencioso na cozinha que ela só faltou dizer pega logo e vai embora.',
        'Por que o boleto parecia confiante? Porque venceu e achou que tinha ganhado a discussão.',
        'Por que a fila ficou engraçada? Porque a pessoa atrás de mim já agia como se tivesse fundado o lugar.',
        'Por que o home office me cansou tanto? Porque abri e fechei abas demais só para parecer ocupado.',
        'Por que perdi a reunião inteira? Porque negociei cinco minutos a mais com o despertador.',
        'Por que virei o evento principal da call? Porque abri a câmera sem querer.',
        'Por que a pia merecia virar museu? Porque acumulou copos sujos o suficiente para uma exposição.',
        'Por que a ida ao mercado deu errado? Porque comprei tudo, menos o pão.',
        'Por que meu Wi-Fi parece preguiçoso? Porque sempre cai no meio da frase.',
        'Por que eu já entro cansado no prédio? Porque a senha é quase um vestibular.',
        'Por que o grupo da família parece firma? Porque o bom dia chega com força de reunião obrigatória.',
        'Por que dobrar roupa vendo série não funciona? Porque eu termino com spoiler e camiseta torta.',
        'Por que meu navegador parece depósito? Porque tem quarenta abas e nenhuma resolve minha vida.',
        'Por que a cadeira do escritório participa da reunião? Porque range mais do que eu falo.',
        'Por que procurar meia em casa é aventura? Porque sempre acho potes, cabos e nenhuma meia.',
        'Por que o caixa rápido era irônico? Porque só faltava vender o mercado inteiro de tanta compra na fila.',
        'Por que o ônibus me rejeitou? Porque chegou lotado com cara de hoje não vai dar.',
        'Por que saí da farmácia com compras aleatórias? Porque entrei por causa de dor e saí com shampoo, bala e vitamina.',
        'Por que minha lista de tarefas assusta? Porque já virou documento oficial do que eu não fiz.',
        'Por que o café ficou famoso no micro-ondas? Porque ficou esquecido lá por uma era geológica.',
        'Por que atendo o interfone desconfiado? Porque quase nunca fui eu quem pediu alguma coisa.',
        'Por que a geladeira parece baterista? Porque ensaia solo de madrugada.',
        'Por que o chão perde a dignidade rápido? Porque basta eu passar pano para alguém entrar com areia emocional.',
        'Por que o elevador parece ensaio fotográfico? Porque todo mundo finge que ignora o espelho enquanto posa.',
        'Por que achar a tampa certa do pote parece jogo? Porque a cozinha tem um escape room próprio.',
        'Por que abro o aplicativo do banco com cuidado? Porque ele sempre confirma que continuo humilde.',
        'Por que o entregador sempre chega quando entro no banho? Porque o universo gosta de testar meu tempo de toalha.',
        'Por que a senha do condomínio parece vingança? Porque cada visita precisa fazer um concurso público.',
        'Por que o controle remoto desaparece justo no filme? Porque ele sente o suspense antes da gente.',
        'Por que a roupa lavada demora a secar no dia certo? Porque o sol também trabalha sob demanda.',
        'Por que o aplicativo de comida me julga? Porque sempre pergunta se quero pedir de novo a mesma escolha emocional.',
        'Por que eu reviso a lista do mercado cinco vezes? Porque ainda assim volto sem o item principal.',
        'Por que o elevador para em todos os andares quando estou atrasado? Porque ele acredita na inclusão.',
        'Por que o café da manhã some rápido em casa? Porque alguém sempre belisca e chama de teste.',
        'Por que a busca pelo carregador virou esporte? Porque cada cômodo tem um cabo que não serve para nada.',
        'Por que a chuva começa no minuto da saída? Porque guarda-chuva só funciona como decoração.',
        'Por que a fila do caixa anda quando eu troco de lado? Porque ela respeita a lei do constrangimento.',
        'Por que abrir a geladeira tantas vezes não ajuda? Porque a resposta continua sendo não ter sobremesa.',
        'Por que a sacola do mercado rasga perto da porta? Porque ela gosta de final dramático.',
        'Por que o micro-ondas apita como se eu não estivesse perto? Porque ele ama expor minha ansiedade.',
        'Por que toda tomada útil fica atrás do móvel pesado? Porque praticidade seria bom demais.',
        'Por que o ônibus chega vazio só quando não preciso? Porque pontualidade gosta de plateia errada.',
        'Por que a lâmpada queima à noite? Porque problema doméstico adora horário nobre.',
        'Por que eu sempre esqueço a garrafa d’água? Porque a sede gosta de me encontrar longe da cozinha.',
        'Por que a busca pela chave começa sempre tarde? Porque ela só revela a localização quando o atraso já venceu.',
        'Por que a máquina de lavar termina quando ninguém lembra dela? Porque ela valoriza o efeito surpresa.',
        'Por que o aplicativo do banco abre com suspense? Porque saldo baixo também merece trilha dramática.',
        'Por que toda visita toca campainha quando a casa está um caos? Porque organização não rende história.',
        'Por que a louça suja se multiplica rápido? Porque copo sozinho sempre chama companhia.',
        'Por que o armário derruba tudo quando abro? Porque ele trabalha com armazenamento por emoção.',
        'Por que o fogão escolhe a boca errada para esquentar mais? Porque receita boa precisa de tensão.',
        'Por que o sofá me prende em cinco minutos? Porque ele entende de sequestro afetivo.',
        'Por que o aplicativo de mapa recalcula tanto? Porque até ele desaprova o meu improviso.',
        'Por que eu dobro roupa e ela nunca acaba? Porque o cesto tem pacto de renovação automática.',
        'Por que o interfone toca quando finalmente sentei? Porque descanso em casa é apenas conceito.',
        'Por que o mercado de bairro decora meu rosto? Porque eu volto três vezes pela mesma cebola esquecida.',
        'Por que o despertador parece pessoal? Porque ele me acusa diariamente de escolhas do passado.',
        'Por que a cadeira da sala vira cabide? Porque toda roupa tem um plano B antes do guarda-roupa.',
        'Por que o aplicativo de clima erra no dia do evento? Porque previsão ama humilhar produção.',
        'Por que a comida esquenta por fora e congela por dentro? Porque o micro-ondas apoia o mistério.',
        'Por que a busca pela tampa certa do pote nunca acaba? Porque a cozinha acredita em alma gêmea difícil.',
        'Por que a bateria do celular despenca na rua? Porque tomada próxima tira todo o drama da história.',
        'Por que o vizinho decide furar parede cedo? Porque silêncio de manhã não rende amizade.',
        'Por que toda atualização acontece quando preciso sair? Porque tecnologia também tem timing cômico.',
        'Por que eu encontro o documento só depois de pedir segunda via? Porque papel gosta de atenção.',
        'Por que o chinelo some só de um pé? Porque o outro resolveu viver relacionamento aberto.',
        'Por que o refrigerante termina na festa antes do gelo? Porque alguém sempre serve copos com sede antiga.',
        'Por que eu lavo a louça e surge outra pia? Porque panela usada se reproduz no vapor.',
        'Por que a encomenda diz saiu para entrega o dia inteiro? Porque ela gosta de suspense em tempo real.',
        'Por que o piso fica limpo por oito segundos? Porque toda casa tem gente especializada em entrar logo depois.',
        'Por que o secador só enrola o fio? Porque praticidade nunca foi o departamento dele.',
        'Por que o fone dá nó sozinho no bolso? Porque ele treina macramê escondido.',
        'Por que abrir o guarda-chuva dentro de casa parece tentador? Porque lá fora ele falha com compromisso.',
        'Por que a comida favorita acaba primeiro? Porque a travessa reconhece fraqueza emocional.',
        'Por que a nota fiscal some no exato dia da troca? Porque objeto importante adora brincar de invisível.'
      ],
      familia: [
        'Como eu sei que minha mãe ficou brava? Porque ela falou meu nome completo com CEP e coordenadas.',
        'Por que toda família precisa vigiar a travessa? Porque sempre tem alguém que vai só experimentar e encerra metade dela.',
        'Por que ninguém acreditou no meu primo? Porque ele jurou que não ronca enquanto a casa inteira ouvia.',
        'Por que almoço de família parece entrevista? Porque sempre aparece um tio com perguntas sobre carreira e futuro.',
        'O que define um casal feliz? Dividir tudo, inclusive a culpa pelo controle remoto sumido.',
        'Por que não dá para contar segredo para a avó? Porque ela repassa a fofoca em três grupos diferentes.',
        'Por que meu pai não pede informação? Porque prefere errar com convicção.',
        'Por que todo churrasco tem um especialista folclórico? Porque ele orienta todo mundo, menos a própria carne.',
        'Por que minha tia parece ter acesso VIP? Porque chega para almoçar já abrindo a panela.',
        'O que casal descobre montando móvel junto? O amor e o limite da paciência no mesmo manual.',
        'Por que meu irmão é radar de comida? Porque some o dia inteiro e aparece no segundo exato em que a panela termina.',
        'Por que a criança da família vence qualquer silêncio? Porque encontra o único lugar barulhento da casa às sete da manhã.',
        'Por que o almoço do meu avô nunca é igual? Porque ele conta a mesma história trocando o final para testar a plateia.',
        'Como minha mãe pergunta se estou com fome? Já servindo o segundo prato.',
        'Como termina uma discussão no grupo da família? Com figurinha, áudio longo e alguém saindo dramaticamente.',
        'O que significa a frase vamos conversar no namoro? Que não vem elogio para a decoração.',
        'Por que brincar cinco minutos com meu sobrinho assusta? Porque a sala volta em estado de reforma.',
        'Como a sogra ajuda sem atrapalhar? Mandando cinco sugestões antes do café.',
        'Por que meu pai não assiste jogo em silêncio? Porque narra cada lance para a rua inteira.',
        'Por que todo encontro de família precisa de pote? Porque sempre tem alguém levando vazio para voltar cheio.',
        'Como minha irmã devolve roupa emprestada? Dizendo que ela já veio assim.',
        'Por que o sofá sofre quando chegam parentes? Porque entra em escala máxima e sem adicional.',
        'O que significa chegar cedo para o meu primo? Um conceito completamente flexível.',
        'Por que casal em mercado é prova de compatibilidade? Porque o preço do sabonete revela caráter.',
        'Por que minha mãe fala que não quer bagunça? Porque é exatamente quando resolve arrumar tudo ao mesmo tempo.',
        'Por que recusar comida da avó parece crime? Porque ela oferece com insistência de decreto federal.',
        'Por que toda mãe pergunta se levei casaco em pleno calor? Porque prevenção para ela nunca tira férias.',
        'Por que o pai desliga a luz em toda casa? Porque ele acha que foi eleito ministro da energia.',
        'Por que o grupo da família parece telejornal? Porque cada bom dia já vem com boletim completo.',
        'Por que visita de parente sempre rende fome? Porque ninguém chega dizendo que acabou de almoçar.',
        'Por que meu irmão vira auditor da geladeira? Porque ele percebe até o sumiço de uma azeitona.',
        'Por que a sobremesa não sobrevive ao almoço em família? Porque sempre existe um alguém só provando pela terceira vez.',
        'Por que o tio conta a mesma piada convicto? Porque ele mede sucesso pelo volume do próprio riso.',
        'Por que a avó oferece comida de cinco em cinco minutos? Porque recusa para ela é só a primeira rodada.',
        'Por que o casal discute no GPS? Porque ninguém aceita que a voz da rota tem mais razão.',
        'Por que o controle da TV vira tema diplomático? Porque cada pessoa da casa acha que herdou o trono.',
        'Por que a criança escolhe justo aquele brinquedo barulhento? Porque paz doméstica não dá ibope.',
        'Por que toda mudança de sofá mexe com a família? Porque tem gente apegada até ao lugar do controle.',
        'Por que a mãe sabe que mexeram na panela? Porque existe perícia emocional de cozinha.',
        'Por que o pai demora para sair de casa? Porque sempre falta uma última conferida em portas que já estavam fechadas.',
        'Por que o almoço de domingo termina em marmita? Porque afeto de família também usa pote com tampa.',
        'Por que meu primo some na hora de arrumar e volta para comer? Porque ele respeita a divisão clássica de talentos.',
        'Por que a sogra elogia e aconselha ao mesmo tempo? Porque ela trabalha com feedback híbrido.',
        'Por que toda foto de família precisa de cinco tentativas? Porque sempre tem alguém piscando e outro filosofando sobre enquadramento.',
        'Por que a criança pergunta tudo na hora da pressa? Porque curiosidade infantil reconhece urgência.',
        'Por que a sala lota quando o bolo chega? Porque laço familiar também atende pelo cheiro de cobertura.',
        'Por que o casal se entende no mercado e se estranha no corredor de limpeza? Porque cada produto desperta uma verdade.',
        'Por que a tia traz lembrancinha para todo mundo? Porque voltar de viagem de mãos vazias é crime no estatuto dela.',
        'Por que o avô aumenta a própria história a cada ano? Porque memória boa também gosta de efeitos especiais.',
        'Por que todo irmão sabe exatamente quando implicar? Porque ele nasceu com sensor para timing inconveniente.',
        'Por que a mãe diz que não quer presente? Porque o teste verdadeiro é adivinhar qual ela queria.',
        'Por que a família toda opina na reforma? Porque parede dos outros sempre aceita mais ideias.',
        'Por que o churrasco vira reunião estratégica? Porque todo mundo tem plano, mas só um segura o fogo.',
        'Por que a criança corre quando ouve tomar banho? Porque negociação de higiene sempre abre audiência pública.',
        'Por que meu pai confia mais em memória do que em lista? Porque admitir que esquece algo fere a honra dele.',
        'Por que a avó manda embora com comida extra? Porque afeto para ela é peso na sacola.',
        'Por que o casal se perde em viagem curta? Porque ninguém quer dar o braço a torcer para o aplicativo.',
        'Por que a casa fica silenciosa quando a criança apronta? Porque silêncio repentino é boletim de ocorrência.',
        'Por que minha irmã pede emprestado e chama de compartilhado? Porque posse na família é conceito flexível.',
        'Por que o almoço especial atrasa? Porque receita em família sempre inclui conversa no meio.',
        'Por que toda visita encontra algo para comentar na decoração? Porque observação gratuita é linguagem de parentesco.',
        'Por que o sobrinho escolhe o colo mais arrumado? Porque mancha boa gosta de roupa clara.',
        'Por que a mãe descobre mentira antes do fim da frase? Porque ela escuta até o que a culpa cochicha.',
        'Por que o pai aumenta o volume da TV quando gosta do programa? Porque emoção dele mede em decibéis.',
        'Por que o primo fala cinco minutos e já cria apelido? Porque intimidade na família entra sem bater.',
        'Por que a viagem em família começa antes de sair? Porque a discussão sobre horário já conta como trajeto.',
        'Por que todo mundo promete ajudar na louça? Porque prometer ainda não sujou a mão de ninguém.',
        'Por que a avó manda mensagem perguntando se cheguei bem antes de eu chegar? Porque preocupação dela tem vantagem no relógio.',
        'Por que o grupo da família revive assunto encerrado? Porque sempre aparece alguém lendo atrasado.',
        'Por que o irmão mais novo se faz de inocente tão bem? Porque prática diária também forma talento.',
        'Por que o pai estaciona e dá aula de direção depois? Porque manobra boa precisa de comentário.',
        'Por que a mãe fala leva um casaco e leva um docinho na mesma frase? Porque proteção e comida andam juntas.',
        'Por que o casal divide série e mesmo assim discute? Porque fidelidade com spoiler é assunto sério.',
        'Por que reunião de família precisa de café no fim? Porque ainda falta energia para a rodada de despedidas.',
        'Por que a despedida da visita demora meia hora? Porque brasileiro inventou o tchau em capítulos.'
      ],
      escola_trabalho: [
        'Por que o aluno ficou em branco na prova? Porque estudou tanto que esqueceu até o próprio nome na hora H.',
        'Por que todo mundo concordou na reunião? Porque ninguém queria assumir que não entendeu o slide.',
        'Por que quase pedi milagre por escrito ao chefe? Porque ele queria algo simples, rápido e perfeito.',
        'Por que a prova parecia fácil só no discurso? Porque era fácil para quem escreveu.',
        'Qual é o e-mail mais rápido do trabalho? Aquele que começa com urgente e termina com ninguém sabe resolver.',
        'Como era meu grupo do seminário? Duas pessoas sumidas, uma opinando e eu descobrindo o tema no dia.',
        'Por que a impressora da escola escolhe o caos? Porque só trava quando o prazo está olhando para você.',
        'O que meu currículo diz e meu corpo responde? O currículo diz proativo e o corpo diz cochilo depois do almoço.',
        'Por que a aula das sete não entra no cérebro? Porque minha mente só pede acesso às oito e meia.',
        'Quanto dura uma reunião rápida na firma? Mais ou menos o tempo de uma novela curta.',
        'O que acontece quando o professor fala consulta liberada? Metade da sala acende mais do que a apostila.',
        'O que o estágio mais me ensinou? A parecer calmo no meio do caos.',
        'Qual é a regra universal das apresentações? Sempre existe um slide que ninguém entende, mas todo mundo respeita.',
        'Por que a caneta falha no pior momento? Porque ela gosta de emoção em formulário importante.',
        'Por que a agenda chora quando o chefe escreve rapidinho? Porque todo mundo sabe que não vai ser rapidinho.',
        'Por que o apagador desaparece na escola? Porque some justo quando a lousa vira arte abstrata.',
        'Por que eu cheguei cedo demais na reunião? Porque participei até do silêncio constrangedor antes do bom dia.',
        'Por que o notebook atualizou na pior hora? Porque foi bem quando eu finalmente sabia o que dizer.',
        'O que a prova de múltipla escolha parece às vezes? Um teste de intuição vestido de ciência.',
        'Por que a impressora do escritório mete medo? Porque reconhece pânico e se alimenta dele.',
        'Por que o aluno ausente vira líder no trabalho em grupo? Porque ele aparece no dia final com voz de autoridade.',
        'O que une equipes no trabalho mais do que treinamento? O café da copa.',
        'O que acontece quando o professor fala atividade em dupla? A sala inteira vira aplicativo de procura.',
        'Por que meu crachá já não impressiona? Porque minha cara de desespero abre mais portas.',
        'Qual é a lei de toda call? Sempre tem alguém falando no mudo e alguém com cachorro coapresentador.',
        'Por que a planilha parecia literatura experimental? Porque já precisava de licença poética para ser entendida.',
        'Por que o professor fala é rapidinho antes da atividade? Porque ele acredita em conceitos muito otimistas de tempo.',
        'Por que a planilha trava quando estou inspirado? Porque produtividade gosta de ser testada.',
        'Por que o aluno lembra da matéria saindo da prova? Porque o cérebro gosta de reprise fora de horário.',
        'Por que toda tarefa em grupo começa em silêncio? Porque cada um espera o outro demonstrar liderança primeiro.',
        'Por que o chefe manda oi antes do pedido? Porque ansiedade no trabalho também merece aquecimento.',
        'Por que a impressora aceita papel até o dia do prazo? Porque depois disso ela entra em manifesto.',
        'Por que a cadeira do escritório reclama mais que eu? Porque ela participa de todas as reuniões sem direito a pausa.',
        'Por que o projetor falha na apresentação importante? Porque tecnologia adora palco cheio.',
        'Por que a sala de aula fica interessada perto do sinal? Porque atenção também toca campainha.',
        'Por que o estagiário aprende rápido a fazer cara de tranquilo? Porque pânico visível não entra no dress code.',
        'Por que o e-mail de alinhamento sempre cresce? Porque alinhamento corporativo se alimenta de respostas em cadeia.',
        'Por que o professor fala isso cai na prova com tanta calma? Porque só a turma precisa entrar em desespero.',
        'Por que todo trabalho urgente nasce no fim da tarde? Porque a pressa gosta de pegar carona no expediente.',
        'Por que o grupo do trabalho usa tantos thumbs up? Porque ninguém quer escrever eu não faço ideia.',
        'Por que a prova oral parece maratona? Porque a boca seca antes da largada.',
        'Por que a caneta some em reunião? Porque material de escritório tem alma nômade.',
        'Por que a call começa com você me ouve? Porque metade do time confia mais no ritual do que no microfone.',
        'Por que o caderno fica bonito no primeiro dia? Porque depois a realidade assume a diagramação.',
        'Por que a senha do sistema expira quando finalmente decoro? Porque estabilidade nunca foi meta.',
        'Por que todo professor ama trabalho para amanhã? Porque surpresa pedagógica rende adrenalina.',
        'Por que o notebook pede atualização na aula? Porque ele escolheu crescer justamente no meu colapso.',
        'Por que o aluno do fundo sempre sabe da resposta quando a aula termina? Porque coragem dele tem atraso.',
        'Por que a pausa para café vira reunião paralela? Porque a verdade da empresa mora perto da garrafa térmica.',
        'Por que o slide mais importante nunca abre? Porque arquivo decisivo também gosta de suspense.',
        'Por que o crachá sempre vira ao contrário na portaria? Porque constrangimento adora acesso controlado.',
        'Por que o professor pergunta alguma dúvida no fim? Porque ele conhece o poder do silêncio coletivo.',
        'Por que o prazo de sexta parece menor? Porque fim de semana já puxa o calendário para longe.',
        'Por que todo mundo diz vamos marcar outra reunião? Porque resolver na atual seria radical demais.',
        'Por que o relatório cresce sozinho? Porque todo pedido de ajuste adota mais um parágrafo.',
        'Por que a régua quebra no dia do cartaz? Porque material escolar sente cheiro de avaliação.',
        'Por que o aluno abre a mochila dez vezes? Porque o item esquecido se esconde melhor sob pressão.',
        'Por que o chefe fala sem pressa e manda para hoje? Porque contradição também ocupa cargo alto.',
        'Por que o quadro branco apaga mal justo na explicação difícil? Porque a pedagogia também gosta de efeitos.',
        'Por que a turma fica unida antes da entrega? Porque nada fortalece mais que um prazo quase fatal.',
        'Por que o teclado do escritório faz barulho heroico? Porque cada e-mail sai como se fosse épico.',
        'Por que a apresentação compartilhada vira caos? Porque versão final é sempre uma ideia provisória.',
        'Por que o professor encontra exatamente quem não estudou? Porque sorte acadêmica tem péssima pontaria.',
        'Por que a fila da copiadora anda devagar? Porque cada pessoa descobre uma configuração inédita.',
        'Por que o aluno quer sentar na frente na prova? Porque cola mental funciona melhor perto da esperança.',
        'Por que a reunião que podia ser mensagem dura uma hora? Porque formalidade gosta de cadeira.',
        'Por que o supervisor aparece quando abro o lanche? Porque produtividade reconhece cheiro de pausa.',
        'Por que o trabalho fica fácil cinco minutos depois de eu entregar? Porque a resposta gosta de humilhar.',
        'Por que o livro mais pesado cai no dia de levar tudo? Porque coluna também precisa de desafio.',
        'Por que o comentário do professor assusta mais que a nota? Porque vem cheio de potencial interpretativo.',
        'Por que o celular vibra quando a aula entra no ponto bom? Porque distração respeita timing dramático.',
        'Por que a lista de presença sempre chega no meu momento de distração? Porque assinatura também é teste de reflexo.',
        'Por que a impressora do RH imprime torto? Porque até a burocracia gosta de personalidade.',
        'Por que o aluno fala presente com atraso? Porque a alma dele ainda estava no corredor.',
        'Por que a sexta no trabalho parece prova final? Porque todo mundo quer terminar tudo antes que o relógio descubra.'
      ],
      absurdo: [
        'Por que o pombo abriu uma startup? Porque queria vender migalhas premium para investidores de praça.',
        'Por que a batata estava filosofando? Porque queria entender o sentido da fritura antes do óleo esquentar.',
        'Por que o dinossauro pediu desculpa no elevador? Porque disse que o atraso vinha do meteoro anterior.',
        'Por que a cadeira pediu férias? Porque estava cansada de sustentar decisões ruins.',
        'Por que o travesseiro fez greve? Porque ninguém respeitava o horário comercial dos sonhos.',
        'Por que o guarda-chuva não quis sair? Porque a previsão era de sol com chance de drama.',
        'Por que a torradeira abriu curso de autoestima? Porque queria ajudar pães inseguros.',
        'Por que o abacaxi virou detetive? Porque já estava acostumado com situações espinhosas.',
        'Por que o jacaré apareceu de terno? Porque queria desconto para comprar uma bicicleta aquática.',
        'Por que a lua faltou ao céu? Porque estava em home office em outro fuso.',
        'Por que o sorvete fundou um sindicato? Porque queria lutar contra calçadas quentes e ameaças de verão.',
        'Por que a gelatina desistiu da corrida? Porque descobriu que nasceu para tremer diante dos desafios.',
        'Por que o guarda-roupa escreveu memórias? Porque tinha muitas histórias atrás das portas.',
        'Por que o chinelo queria ser avião? Porque sonhava ir além da conexão com o pé.',
        'Por que a cebola foi eleita prefeita da salada? Porque governava tudo por camadas.',
        'Por que o liquidificador largou tudo? Porque foi seguir carreira solo em música eletrônica.',
        'Por que a colher se apaixonou por um cometa? Porque queria mexer estrelas no café.',
        'Por que o sofá tirou carteira de piloto? Porque se cansou dos voos da imaginação.',
        'Por que a formiga cobrou aluguel no açúcar? Porque montou um mezanino ali.',
        'Por que o poste adotou um vaga-lume? Porque queria apoio na iluminação da noite.',
        'Qual é o segredo do sucesso da torrada? Aceitar a pressão do fogo.',
        'Por que o peixinho abriu agência de turismo? Porque viu potencial em poças emocionadas.',
        'Por que a nuvem comprou patins? Porque queria fazer chuva com mais estilo.',
        'Quando o caracol prometeu entregar a mensagem? Até terça de algum ano.',
        'Por que a meia perdida fundou uma república? Porque cansou de viver exilada na máquina de lavar.',
        'Por que o tomate entrou para o teatro experimental? Porque só queria atuar em saladas existenciais.',
        'Por que o abajur quis aprender mergulho? Porque sonhava iluminar o fundo do oceano.',
        'Por que a sardinha virou coach? Porque prometia ensinar cardumes a pensarem fora da lata.',
        'Por que o guarda-roupa pediu passaporte? Porque queria conhecer cabides internacionais.',
        'Por que o biscoito abriu observatório? Porque desconfiava que a lua era recheada.',
        'Por que o chinelo contratou segurança? Porque andava cercado de passos suspeitos.',
        'Por que a colher foi eleita rainha? Porque mexia com todo o reino.',
        'Por que o tijolo escreveu poesia? Porque vivia cercado de paredes emocionais.',
        'Por que o helicóptero foi à padaria? Porque ouviu falar em sonho fresco.',
        'Por que o abacate comprou gravata? Porque queria parecer maduro em reuniões.',
        'Por que o teclado fundou uma banda submarina? Porque queria tocar em recifes maiores.',
        'Por que a formiga abriu um hotel de luxo? Porque cansou de morar em terra alugada.',
        'Por que o chapéu desistiu da política? Porque já tinha muita cabeça para cobrir.',
        'Por que o espantalho estudou astronomia? Porque passava noites olhando estrelas e corvos.',
        'Por que a geleia virou juíza? Porque sabia lidar com casos pegajosos.',
        'Por que o sapato foi ao espaço? Porque ouviu dizer que lá em cima o salto era maior.',
        'Por que o chuveiro pediu autógrafo ao trovão? Porque era fã de shows molhados.',
        'Por que a melancia abriu academia de dança? Porque queria ensinar rebolado com equilíbrio.',
        'Por que o despertador se mudou para a floresta? Porque queria acordar passarinho no grito.',
        'Por que a bicicleta escreveu um romance? Porque tinha duas rodas de sentimentos.',
        'Por que o fósforo abriu agência de viagens? Porque vivia vendendo pacotes relâmpago.',
        'Por que o escorredor de macarrão virou filósofo? Porque só deixava passar o essencial.',
        'Por que o foguetinho de festa pediu terapia? Porque explodia por qualquer motivo.',
        'Por que o peixe-palhaço abriu banco? Porque gostava de investimentos de mergulho.',
        'Por que o ventilador foi morar no deserto? Porque queria finalmente ter plateia fixa.',
        'Por que a gaveta adotou uma nuvem? Porque estava cansada de guardar só coisas secas.',
        'Por que o óculos quis virar ponte? Porque já passava o dia ligando dois mundos.',
        'Por que o pudim virou mágico? Porque sumia assim que entrava em cena.',
        'Por que o carimbo pediu férias na praia? Porque só conhecia papel e pressão.',
        'Por que a estrela cadente abriu serviço de entregas? Porque fazia tudo em alta velocidade.',
        'Por que o pregador de roupa quis ser DJ? Porque nasceu para prender hits no varal.',
        'Por que o tapete abriu escola de voo? Porque vivia sonhando em ser tapete mágico.',
        'Por que a cebola montou uma banda triste? Porque todo ensaio terminava em lágrimas.',
        'Por que o marcador de texto foi ao circo? Porque queria destacar números brilhantes.',
        'Por que o canudo virou historiador? Porque gostava de sugar detalhes do passado.',
        'Por que o sorvete usou cachecol? Porque tinha medo de pegar muito calor.',
        'Por que a mala pediu aula de teatro? Porque queria aprender a fazer entrada triunfal.',
        'Por que o dominó abriu templo? Porque acreditava no efeito cascata espiritual.',
        'Por que o garfo virou astrônomo? Porque passava noites procurando estrelas no prato.',
        'Por que a janela adotou um polvo? Porque queria finalmente ter cortinas com atitude.',
        'Por que o sabonete montou uma startup espacial? Porque queria limpar a reputação de Marte.',
        'Por que o barco foi ao salão de beleza? Porque queria cortar as ondas com estilo.',
        'Por que o abajur levou protetor solar? Porque ia enfrentar uma ideia muito brilhante.',
        'Por que a abóbora virou detetive paranormal? Porque já nasceu pronta para assombrar pistas.',
        'Por que o elevador escreveu ficção científica? Porque entendia de subidas dimensionais.',
        'Por que o varal quis ser diplomata? Porque passava o dia mediando roupas tensas.',
        'Por que o guarda-chuva estudou canto lírico? Porque queria se abrir em grandes apresentações.',
        'Por que o cacto abriu cafeteria? Porque acreditava em atendimento espinhosamente sincero.',
        'Por que a torrada fundou um partido? Porque queria mais espaço para a manteiga de todos.',
        'Por que o aspirador sonhava em ser poeta? Porque já vivia recolhendo restos de inspiração.'
      ]
    };

    const READING_CHALLENGES_PT = [
      'Leia como se fosse um locutor de rádio dramático.',
      'Leia segurando o riso a cada pausa.',
      'Leia como se estivesse contando um segredo importante.',
      'Leia com voz de desenho animado.',
      'Leia como se estivesse muito cansado.',
      'Leia em ritmo de notícia urgente.',
      'Leia como se estivesse em uma peça de teatro exagerada.',
      'Leia com total seriedade, por mais absurda que seja a piada.',
      'Leia como se estivesse apresentando um prêmio.',
      'Leia como se fosse um professor tentando manter a ordem.',
      'Leia como se fosse um narrador esportivo empolgado.',
      'Leia como se estivesse improvisando um stand-up ruim.'
    ];

    const DEFAULT_JOKES_EN = {
      trocadilhos: [
        'Why did the calendar panic? Because its days were numbered.',
        'The elevator got emotional because it had too many ups and downs.',
        'The lamp took a break because it needed time to see things clearly.',
        'The baker joined the gym to work on his core.',
        'The clock got fired for working too many hours.',
        'The mirror skipped the party because it could not see itself there.',
        'The stapler became a therapist because it loved helping people hold it together.',
        'The battery left early because it was out of energy for small talk.',
        'The ladder became famous because it always knew how to rise in life.',
        'The pencil asked for a vacation because it had reached its point.',
        'The blanket got promoted because it always had people covered.',
        'The charger ended the relationship because the spark was gone.',
        'The button quit because it could not handle the pressure.',
        'The notebook became a poet because it was full of lines.',
        'The frying pan loved gossip because things always got heated around it.',
        'The window was honest because it liked to keep things clear.',
        'The shoelace became a motivational speaker because it knew how to tie things together.',
        'The broom won employee of the month because it always swept the competition.',
        'The pillow opened a clinic because it was great with heavy cases.',
        'The door became a comic because it knew how to deliver an entrance.',
        'The folder got nervous because it had too much on file.',
        'The sponge stayed calm because it knew how to soak things in.',
        'The helmet gave advice because it always protected its thoughts.',
        'The candle ended the argument by saying it could shed some light on the issue.',
        'The glove loved teamwork because it was always hands on.'
      ],
      tiozao: [
        'What do you call a fake noodle? An impasta.',
        'Why did the scarecrow win an award? Because he was outstanding in his field.',
        'Why do bees have sticky hair? Because they use honeycombs.',
        'What do you call cheese that is not yours? Nacho cheese.',
        'Why did the tomato blush? Because it saw the salad dressing.',
        'What do you call a fish wearing a bowtie? Sofishticated.',
        'Why did the math book look sad? Because it had too many problems.',
        'What did the ocean say to the beach? Nothing, it just waved.',
        'Why did the computer go to the doctor? It had a virus.',
        'What do you call a pile of cats? A meowtain.',
        'Why did the bicycle fall over? Because it was two tired.',
        'What do you call a factory that makes okay products? A satisfactory.',
        'Why do cows wear bells? Because their horns do not work.',
        'What did one wall say to the other wall? I will meet you at the corner.',
        'Why can you not trust stairs? They are always up to something.',
        'What do you call a bear with no teeth? A gummy bear.',
        'Why did the golfer bring two pairs of pants? In case he got a hole in one.',
        'What did the zero say to the eight? Nice belt.',
        'Why did the coffee file a police report? It got mugged.',
        'What kind of music do balloons hate? Pop.',
        'Why did the cookie go to the hospital? It felt crummy.',
        'What do you call a sleeping bull? A bulldozer.',
        'Why did the orange stop halfway up the hill? It ran out of juice.',
        'What did one plate whisper to the other? Dinner is on me.',
        'Why did the melon jump into the lake? It wanted to be a watermelon.'
      ],
      cotidiano: [
        'I opened the fridge at midnight so quietly that even the leftovers looked nervous.',
        'My alarm and I are in a toxic relationship where it screams and I ignore it.',
        'I went to the store for bread and came back with snacks, candles, and absolutely no bread.',
        'My Wi-Fi always cuts out right when I try to sound intelligent.',
        'I sat down to answer one email and somehow adopted six new tabs.',
        'The quick checkout line had so many carts it needed traffic lights.',
        'I cleaned the whole house and ten minutes later it looked like the floor had trust issues.',
        'My phone battery drops fastest when I am pretending to be important.',
        'I only hear the doorbell when I am in the middle of looking my worst.',
        'I reheated my coffee so many times it now counts as a recurring appointment.',
        'Every group chat has one person typing a novel and another replying with a thumbs up.',
        'I tried to fold laundry while watching a show and ended up spoiled and wrinkled.',
        'My to-do list has become a witness statement.',
        'I open my bank app only to confirm that humility is still my lifestyle.',
        'The bus looked full, made eye contact, and kept going.',
        'I looked for one missing sock and found three chargers and a receipt from 2019.',
        'The elevator mirror has seen more fake confidence than any life coach.',
        'I started cleaning my room and accidentally took a nostalgia break.',
        'The grocery cart always chooses one wheel to live its own truth.',
        'I answer unknown calls like a hostage negotiator.',
        'My browser history looks like three careers and one identity crisis.',
        'I sat on the couch for five minutes and woke up in a different time zone.',
        'The microwave beeped like I had achieved something remarkable.',
        'I packed for a short trip and somehow prepared for climate change.',
        'My plant and I are both alive mainly out of stubbornness.'
      ],
      familia: [
        'My mom does not yell; she just says my full name like a legal warning.',
        'Every family has one person who says they are not hungry and then steals half your plate.',
        'My dad refuses directions because getting lost is apparently part of the adventure package.',
        'Family group chats can turn one photo into a three day investigation.',
        'Grandma says take more food like she is negotiating a peace treaty.',
        'My sibling disappears all day and magically returns when dinner is ready.',
        'Every family reunion has one uncle acting like lunch is also a job interview.',
        'My cousin says he does not snore, but the windows would like a statement.',
        'My aunt checks every pot in the kitchen like she has VIP access.',
        'Couples do not argue about the big things; they argue about where the charger lived last.',
        'My grandpa tells the same story every holiday and still edits it like a director’s cut.',
        'There is always one relative who brings an empty container and leaves with leftovers.',
        'My little cousin treats the living room like a construction site with snacks.',
        'Every family has one chair that permanently wears clothes.',
        'My mom asks if I am cold while actively placing a blanket on me.',
        'Nothing tests love like assembling furniture with someone you respect.',
        'My brother borrows things the same way museums borrow art.',
        'My parents can find anything in the house except the thing they personally misplaced.',
        'My grandma says she has a tiny gift and hands you something the size of a suitcase.',
        'There is always one person taking candid photos like a wildlife documentary host.',
        'The family dog hears one snack wrapper and reports for duty immediately.',
        'Holiday dinners always feature one debate nobody trained for.',
        'My uncle tells a joke, laughs first, and then waits for moral support.',
        'Every couple has one person packing and one person wandering emotionally.',
        'My family says leave whenever you want right before offering dessert.'
      ],
      escola_trabalho: [
        'I studied so hard for the test that I forgot everything except panic.',
        'Every meeting has one slide nobody understands and everyone respects.',
        'My boss said this is a quick task, which is workplace code for cancel your afternoon.',
        'The printer only jams when the deadline is making direct eye contact.',
        'My laptop updates itself exactly when I finally know what I am doing.',
        'The group project had four people: two ghosts, one critic, and me.',
        'The teacher said the exam was easy in the same way mountains are just uphill walks.',
        'Every office coffee machine is really an unofficial support group.',
        'I logged into the call early enough to enjoy the awkward silence deluxe edition.',
        'My badge opens fewer doors than my look of desperation.',
        'The intern learns fast when every mistake becomes next week’s training material.',
        'A classroom can smell fear the second a pop quiz is announced.',
        'My resume says detail oriented; my desktop says creative archaeology.',
        'Someone is always presenting while still discovering the topic in real time.',
        'The whiteboard marker runs out only when inspiration finally arrives.',
        'The phrase small revision has ruined many peaceful afternoons.',
        'Half of remote work is muting yourself and still looking concerned.',
        'In school, the person who studied least is always the first to say that was easy.',
        'Every office has one spreadsheet that should qualify as abstract art.',
        'My email inbox keeps acting like I asked for character development.',
        'The professor said pair up and the room turned into speed dating with backpacks.',
        'There is always one coworker whose calendar looks like a game of Tetris.',
        'The copy machine senses fear and feeds on it.',
        'I spent more time naming the file than doing the assignment.',
        'Every workshop starts with icebreakers that would be illegal among strangers.'
      ],
      absurdo: [
        'A pigeon launched a luxury crumb startup and now only lands near investors.',
        'I saw a potato doing breathwork before a big presentation to the fryer.',
        'A dinosaur got into the elevator and apologized for the previous meteor delay.',
        'The umbrella refused to leave home because the forecast said sunny with emotional turbulence.',
        'A jellybean opened a law firm that specializes in sticky situations.',
        'The moon missed the night shift because it was working from home.',
        'A toaster started a confidence podcast for insecure bread.',
        'The sofa got a pilot license so daydreaming could become a real route.',
        'A carrot became a philosopher and now only asks root questions.',
        'The ceiling fan thinks it is the headliner of the house tour.',
        'One sock founded an independent nation inside the dryer.',
        'A cucumber tried stand-up and absolutely crushed in the salad scene.',
        'The spoon fell in love with a comet and now stirs galaxies into tea.',
        'A traffic cone started giving life advice at road construction sites.',
        'The mailbox wrote a memoir called Letters I Never Asked For.',
        'A watermelon hired bodyguards because summer was getting too personal.',
        'The staircase joined a dance company for obvious reasons.',
        'A tiny crab opened a gym and called it Sideways Fitness.',
        'The shampoo bottle dreams of a career in opera because it already knows volume.',
        'A loaf of bread became a weather reporter and kept predicting scattered crumbs.',
        'The cactus started a hug-free social club.',
        'A cloud bought roller skates to make stylish rain entrances.',
        'The vacuum cleaner left to find itself and somehow came back with less dust and more opinions.',
        'A rubber duck now manages a luxury spa in a bathtub near you.',
        'The mailbox and the moon are in a long distance relationship based entirely on timing.'
      ]
    };
    const DEFAULT_JOKES_ES = clone(DEFAULT_JOKES_PT);
    const DEFAULT_JOKES_FR = clone(DEFAULT_JOKES_PT);
    const DEFAULT_JOKES_DE = clone(DEFAULT_JOKES_PT);
    const DEFAULT_JOKES_IT = clone(DEFAULT_JOKES_PT);
    const READING_CHALLENGES_EN = [
      'Read it like a dramatic radio host.',
      'Read it while trying not to laugh at every pause.',
      'Read it like you are sharing a huge secret.',
      'Read it with a cartoon voice.',
      'Read it like you are extremely tired.',
      'Read it like urgent breaking news.',
      'Read it like an over-the-top stage actor.',
      'Read it with total seriousness, no matter how silly the joke is.',
      'Read it like you are presenting an award.',
      'Read it like a teacher trying to keep order.',
      'Read it like an excited sports commentator.',
      'Read it like you are improvising a bad stand-up set.'
    ];
    const READING_CHALLENGES_ES = clone(READING_CHALLENGES_PT);
    const READING_CHALLENGES_FR = clone(READING_CHALLENGES_PT);
    const READING_CHALLENGES_DE = clone(READING_CHALLENGES_PT);
    const READING_CHALLENGES_IT = clone(READING_CHALLENGES_PT);

    // Content pack schema used by the app and by future downloadable packs:
    // {
    //   id,
    //   name,
    //   source: 'builtin' | 'custom' | 'downloaded',
    //   editable: boolean,
    //   enabled: boolean,
    //   jokes: { [locale]: { [category]: JokeEntry[] } },
    //   readingChallenges: { [locale]: string[] }
    // }
    function createCorePack() {
      return {
        id: CORE_PACK_ID,
        name: {
          pt: 'Pack Core de Piadas',
          en: 'Core Joke Pack'
        },
        source: 'builtin',
        editable: true,
        enabled: true,
        jokes: {
          pt: clone(DEFAULT_JOKES_PT),
          en: clone(DEFAULT_JOKES_EN),
          es: clone(DEFAULT_JOKES_ES),
          fr: clone(DEFAULT_JOKES_FR),
          de: clone(DEFAULT_JOKES_DE),
          it: clone(DEFAULT_JOKES_IT)
        },
        readingChallenges: {
          pt: clone(READING_CHALLENGES_PT),
          en: clone(READING_CHALLENGES_EN),
          es: clone(READING_CHALLENGES_ES),
          fr: clone(READING_CHALLENGES_FR),
          de: clone(READING_CHALLENGES_DE),
          it: clone(READING_CHALLENGES_IT)
        }
      };
    }

    function syncPackLocaleCompatibility(pack, locale) {
      pack.words = pack.words || {};
      pack.challenges = pack.challenges || {};
      pack.words[locale] = createLegacyWordBankFromJokeBank(pack.jokes?.[locale] || {});
      pack.challenges[locale] = normalizeChallenges(pack.readingChallenges?.[locale] || []);
    }

    function normalizePack(pack) {
      const normalizedJokes = {};
      const normalizedReadingChallenges = {};
      const locales = new Set([
        ...Object.keys(pack?.jokes || {}),
        ...Object.keys(pack?.words || {}),
        ...Object.keys(pack?.readingChallenges || {}),
        ...Object.keys(pack?.challenges || {})
      ]);
      locales.forEach(locale => {
        const rawJokes = pack?.jokes?.[locale];
        normalizedJokes[locale] = rawJokes && typeof rawJokes === 'object' && !Array.isArray(rawJokes)
          ? normalizeJokeBank(rawJokes)
          : convertLegacyWordBankToJokeBank(pack?.words?.[locale] || {});
        normalizedReadingChallenges[locale] = normalizeChallenges(
          pack?.readingChallenges?.[locale] || pack?.challenges?.[locale] || []
        );
      });

      const normalizedPack = {
        id: pack?.id || `pack-${Date.now()}`,
        name: pack?.name || 'Pack',
        description: pack?.description || '',
        version: pack?.version || '',
        author: pack?.author || '',
        source: pack?.source || 'local',
        editable: pack?.editable !== false,
        enabled: pack?.enabled !== false,
        installedAt: pack?.installedAt || '',
        license: pack?.license || null,
        challengeOverrides: (pack?.challengeOverrides && typeof pack.challengeOverrides === 'object') ? pack.challengeOverrides : {},
        jokes: normalizedJokes,
        readingChallenges: normalizedReadingChallenges,
        words: {},
        challenges: {}
      };
      Object.keys(normalizedJokes).forEach(locale => {
        syncPackLocaleCompatibility(normalizedPack, locale);
      });
      return normalizedPack;
    }

    function getLocalizedText(value, fallback = '') {
      if (!value) return fallback;
      if (typeof value === 'string') return value;
      return value[currentLanguage] || value[DEFAULT_LANGUAGE] || value.pt || Object.values(value)[0] || fallback;
    }

    function getPackDisplayName(pack) {
      return getLocalizedText(pack?.name, 'Pack');
    }

    function getPackWordCount(pack, locale = currentLanguage) {
      const bank = normalizeJokeBank(pack?.jokes?.[locale] || {});
      return CATEGORY_KEYS.reduce((count, category) => count + bank[category].length, 0);
    }

    function getPackTotalContentCount(pack) {
      const locales = new Set([
        ...Object.keys(pack?.words || {}),
        ...Object.keys(pack?.challenges || {})
      ]);
      let count = 0;
      locales.forEach(locale => {
        count += getPackWordCount(pack, locale);
        count += normalizeChallenges(pack?.challenges?.[locale] || []).length;
      });
      return count;
    }

    function canonicalize(value) {
      if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
      if (value && typeof value === 'object') {
        return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
      }
      return JSON.stringify(value);
    }

    function bytesToBase64Url(bytes) {
      const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    }

    function base64UrlToBytes(value) {
      const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
      const binary = atob(padded);
      return Uint8Array.from(binary, char => char.charCodeAt(0));
    }

    async function sha256Base64Url(value) {
      if (!crypto?.subtle) throw new Error(t('packErrors.cryptoUnavailable'));
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      return bytesToBase64Url(new Uint8Array(digest));
    }

    function buildPackSignedPayload(userId, packId, contentHash) {
      return `${PACK_SIGNATURE_CONTEXT}\nuser_id=${userId}\npack_id=${packId}\ncontent_sha256=${contentHash}`;
    }

    async function verifyPackSignature(userId, packId, contentHash, signature) {
      if (!crypto?.subtle) throw new Error(t('packErrors.cryptoUnavailable'));
      const publicKey = await crypto.subtle.importKey(
        'jwk',
        PACK_SIGNING_PUBLIC_KEY,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify']
      );
      return crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        publicKey,
        base64UrlToBytes(signature),
        new TextEncoder().encode(buildPackSignedPayload(userId, packId, contentHash))
      );
    }

    function mergeUniqueStrings(primary = [], secondary = []) {
      return [...new Set([...(primary || []), ...(secondary || [])].map(item => String(item).trim()).filter(Boolean))];
    }

    function mergeJokeBanks(baseBank = {}, savedBank = {}) {
      const normalizedBase = normalizeJokeBank(baseBank);
      const normalizedSaved = normalizeJokeBank(savedBank);
      const merged = createEmptyJokeBank();

      CATEGORY_KEYS.forEach(category => {
        merged[category] = normalizeJokeList([
          ...normalizedBase[category],
          ...normalizedSaved[category]
        ]);
      });

      return merged;
    }

    function mergeCorePack(savedPack = {}) {
      const defaultCore = normalizePack(createCorePack());
      const merged = {
        ...defaultCore,
        ...savedPack,
        id: CORE_PACK_ID,
        source: 'builtin',
        editable: savedPack?.editable !== false,
        enabled: savedPack?.enabled !== false,
        jokes: {},
        readingChallenges: {}
      };

      const locales = new Set([
        ...Object.keys(defaultCore.jokes || {}),
        ...Object.keys(savedPack.jokes || {}),
        ...Object.keys(savedPack.words || {}),
        ...Object.keys(defaultCore.readingChallenges || {}),
        ...Object.keys(savedPack.readingChallenges || {}),
        ...Object.keys(savedPack.challenges || {})
      ]);

      locales.forEach(locale => {
        const savedJokes = savedPack.jokes?.[locale] || convertLegacyWordBankToJokeBank(savedPack.words?.[locale] || {});
        merged.jokes[locale] = mergeJokeBanks(defaultCore.jokes?.[locale], savedJokes);
        merged.readingChallenges[locale] = savedPack.challengeOverrides?.[locale]
          ? normalizeChallenges(savedPack.readingChallenges?.[locale] || savedPack.challenges?.[locale] || [])
          : mergeUniqueStrings(
            defaultCore.readingChallenges?.[locale],
            savedPack.readingChallenges?.[locale] || savedPack.challenges?.[locale]
          );
      });

      return normalizePack(merged);
    }

    function createDefaultContentModel() {
      return {
        version: 1,
        packs: [normalizePack(createCorePack())]
      };
    }

    function loadContentModel() {
      try {
        const saved = JSON.parse(localStorage.getItem(CONTENT_KEY) || 'null');
        if (saved?.packs?.length) {
          const normalizedPacks = saved.packs.map(pack => (
            pack?.id === CORE_PACK_ID ? mergeCorePack(pack) : normalizePack(pack)
          ));
          if (!normalizedPacks.some(pack => pack.id === CORE_PACK_ID)) {
            normalizedPacks.unshift(normalizePack(createCorePack()));
          }
          return {
            version: 1,
            packs: normalizedPacks
          };
        }
      } catch (e) { }

      const model = createDefaultContentModel();
      try {
        const legacyWords = JSON.parse(localStorage.getItem(LEGACY_WORDS_KEY) || 'null');
        if (legacyWords) {
          model.packs[0].jokes.pt = convertLegacyWordBankToJokeBank(legacyWords);
          syncPackLocaleCompatibility(model.packs[0], 'pt');
        }
      } catch (e) { }
      return model;
    }

    let contentModel = loadContentModel();

    function saveContentModel() {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(contentModel));
    }

    function getEnabledPacks() {
      return (contentModel.packs || []).filter(pack => pack.enabled !== false);
    }

    function getCorePack() {
      return contentModel.packs.find(pack => pack.id === CORE_PACK_ID) || normalizePack(createCorePack());
    }

    function getPremiumPacks(options = {}) {
      const { enabledOnly = true } = options;
      return (contentModel.packs || []).filter(pack => (
        pack.source === 'downloaded' && (!enabledOnly || pack.enabled !== false)
      ));
    }

    function getPremiumCategoryToken(packId) {
      return `pack:${packId}`;
    }

    function getPackIdFromCategoryToken(token) {
      return String(token || '').startsWith('pack:') ? String(token).slice(5) : '';
    }

    function getPremiumPackByToken(token) {
      const packId = getPackIdFromCategoryToken(token);
      if (!packId) return null;
      return getPremiumPacks().find(pack => pack.id === packId) || null;
    }

    function isPremiumCategoryToken(token) {
      return Boolean(getPremiumPackByToken(token));
    }

    function isValidCategoryToken(token) {
      return CATEGORY_KEYS.includes(token) || isPremiumCategoryToken(token);
    }

    function ensureUniqueWords(words) {
      return [...new Set(words)];
    }

    function getLocalizedChallenges(locale = currentLanguage) {
      const corePack = getCorePack();
      let list = normalizeChallenges(corePack.readingChallenges?.[locale] || []);
      if (!list.length && !corePack.challengeOverrides?.[locale]) {
        list = normalizeChallenges(createCorePack().readingChallenges?.[locale] || []);
      }
      getPremiumPacks().forEach(pack => {
        list = ensureUniqueWords([...list, ...normalizeChallenges(pack.readingChallenges?.[locale] || [])]);
      });
      return list;
    }

    function getEditablePack() {
      let pack = contentModel.packs.find(item => item.editable !== false);
      if (!pack) {
        pack = normalizePack({
          id: `custom-${Date.now()}`,
          name: { pt: 'Pack Local Personalizado', en: 'Custom Local Pack' },
          source: 'custom',
          editable: true,
          enabled: true,
          jokes: {},
          readingChallenges: {}
        });
        contentModel.packs.push(pack);
      }
      return pack;
    }

    function ensurePackLocale(pack, locale = currentLanguage) {
      pack.jokes = pack.jokes || {};
      pack.readingChallenges = pack.readingChallenges || {};
      pack.words = pack.words || {};
      pack.challenges = pack.challenges || {};
      if (!pack.jokes[locale]) {
        pack.jokes[locale] = createEmptyJokeBank();
      } else {
        pack.jokes[locale] = normalizeJokeBank(pack.jokes[locale]);
      }
      if (!pack.readingChallenges[locale]) {
        pack.readingChallenges[locale] = [];
      } else {
        pack.readingChallenges[locale] = normalizeChallenges(pack.readingChallenges[locale]);
      }
      syncPackLocaleCompatibility(pack, locale);
    }

    async function buildInstalledPackFromEnvelope(envelope) {
      if (!envelope || typeof envelope !== 'object') throw new Error(t('packErrors.invalidJson'));
      if (envelope.schema !== WORD_PACK_SCHEMA) throw new Error(t('packErrors.invalidSchema'));
      if (envelope.user_id !== appUserId) throw new Error(t('packErrors.invalidUser'));
      if (!envelope.pack_id || typeof envelope.pack_id !== 'string') throw new Error(t('packErrors.invalidPackId'));
      if (envelope.pack_id === CORE_PACK_ID) throw new Error(t('packErrors.reservedPackId'));
      if (envelope.signature_algorithm !== PACK_SIGNATURE_ALGORITHM) throw new Error(t('packErrors.invalidAlgorithm'));
      if (!envelope.signature || typeof envelope.signature !== 'string') throw new Error(t('packErrors.invalidSignature'));

      const content = envelope.content || {};
      const contentHash = await sha256Base64Url(canonicalize(content));
      if (envelope.content_sha256 && envelope.content_sha256 !== contentHash) {
        throw new Error(t('packErrors.invalidContentHash'));
      }

      const isSignatureValid = await verifyPackSignature(envelope.user_id, envelope.pack_id, contentHash, envelope.signature);
      if (!isSignatureValid) throw new Error(t('packErrors.invalidSignature'));

      const normalizedEnvelopeChallenges = Array.isArray(content.readingChallenges || content.challenges)
        ? { [DEFAULT_LANGUAGE]: (content.readingChallenges || content.challenges || []) }
        : (content.readingChallenges || content.challenges || {});

      const pack = normalizePack({
        id: envelope.pack_id,
        name: content.name || envelope.pack_id,
        description: content.description || '',
        version: content.version || '',
        author: content.author || '',
        source: 'downloaded',
        editable: false,
        enabled: true,
        installedAt: new Date().toISOString(),
        license: {
          userId: envelope.user_id,
          signature: envelope.signature,
          algorithm: envelope.signature_algorithm,
          contentSha256: contentHash
        },
        jokes: content.jokes || convertLegacyWordBankToJokeBank(content.words || {}),
        readingChallenges: normalizedEnvelopeChallenges
      });

      if (getPackTotalContentCount(pack) === 0) throw new Error(t('packErrors.emptyPack'));
      return pack;
    }

    async function parsePackFile(file) {
      if (!file) throw new Error(t('packErrors.fileRequired'));
      try {
        return JSON.parse(await file.text());
      } catch (e) {
        throw new Error(t('packErrors.invalidJson'));
      }
    }

    function getCategoryLabel(category, options = {}) {
      const { singular = false, withIcon = false } = options;
      const premiumPack = getPremiumPackByToken(category);
      if (premiumPack) {
        const premiumLabel = getPackDisplayName(premiumPack);
        return withIcon ? `⭐ ${premiumLabel}` : premiumLabel;
      }
      const label = t(`category.${category}.${singular ? 'singular' : 'plural'}`);
      return withIcon ? `${CATEGORY_ICONS[category] || ''} ${label}`.trim() : label;
    }

    function getDefaultCoreChallenges(locale = currentLanguage) {
      return normalizeChallenges(createCorePack().readingChallenges?.[locale] || []);
    }

    function getCoreJokesForCategory(category, locale = currentLanguage) {
      const bank = normalizeJokeBank(getCorePack().jokes?.[locale] || {});
      return bank[category] || [];
    }

    function getPremiumJokesForPack(pack, locale = currentLanguage) {
      const bank = normalizeJokeBank(pack?.jokes?.[locale] || {});
      let jokes = [];
      CATEGORY_KEYS.forEach(category => {
        jokes = normalizeJokeList([...jokes, ...(bank[category] || [])]);
      });
      return jokes;
    }

    function countWordsForCategoryToken(category, diff = 'easy') {
      const premiumPack = getPremiumPackByToken(category);
      if (premiumPack) return getPremiumJokesForPack(premiumPack).length;
      if (CATEGORY_KEYS.includes(category)) return getCoreJokesForCategory(category).length;
      return 0;
    }

    function countWordsForSelectedCategories(categories, diff = 'easy') {
      return (categories || []).reduce((total, category) => total + countWordsForCategoryToken(category, diff), 0);
    }

    function normalizeSelectedCategories(categories = []) {
      const selected = ensureUniqueWords(categories.map(category => String(category))).filter(isValidCategoryToken);
      return selected.length ? selected : getDefaultSelectedCategories();
    }

    function getDefaultTeamName(team, language = currentLanguage) {
      return t(`teams.default${team}`, {}, language);
    }

    function getDefaultPlayerName(number, language = currentLanguage) {
      return t('players.defaultName', { number }, language);
    }

    function isDefaultTeamName(name, team) {
      return SUPPORTED_LANGUAGES.some(language => name === getDefaultTeamName(team, language));
    }

    function getDefaultSelectedCategories() {
      return ['trocadilhos', 'cotidiano', 'tiozao'];
    }

    function formatCount(count, singularKey, pluralKey) {
      return `${count} ${t(count === 1 ? singularKey : pluralKey)}`;
    }

    function parsePointValue(value, fallback = 0) {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? Math.max(0, Math.min(999, parsed)) : fallback;
    }

    function getConfiguredCorrectPoints() {
      return parsePointValue(document.getElementById('correct-points-input')?.value, DEFAULT_CORRECT_POINTS);
    }

    function getConfiguredWrongPenaltyPoints() {
      return parsePointValue(document.getElementById('wrong-points-input')?.value, DEFAULT_WRONG_PENALTY_POINTS);
    }

    function isFfaGuesserPointsEnabled() {
      return false;
    }

    function getConfiguredFfaGuesserPoints() {
      return 0;
    }

    function addScore(scoreKey, delta) {
      if (!scoreKey || !Number.isFinite(delta) || delta === 0) return;
      gameState.scores[scoreKey] = (gameState.scores[scoreKey] || 0) + delta;
    }

    function getQuickGamePlayerCount(config) {
      return config.mode === 'teams'
        ? (config.teams.A?.length || 0) + (config.teams.B?.length || 0)
        : (config.players?.length || 0);
    }

    function getQuickGameSummary(config) {
      const normalized = normalizeQuickGameConfig(config);
      const modeLabel = normalized.mode === 'teams' ? t('setup.modeTeamsName') : t('setup.modeFfaName');
      const playerCountLabel = formatCount(getQuickGamePlayerCount(normalized), 'common.playerSingular', 'common.playerPlural');
      const categoriesLabel = normalized.selectedCategories.map(category => getCategoryLabel(category)).join(', ');
      const roundsLabel = formatCount(normalized.rounds, 'common.roundSingular', 'common.roundPlural');
      const challengeLabel = normalized.randomChallenge ? t('setup.randomChallengeLabel') : '';
      return [modeLabel, playerCountLabel, categoriesLabel, roundsLabel, challengeLabel].filter(Boolean).join(' | ');
    }

    function getQuickGameCategoryIcon(category) {
      if (getPremiumPackByToken(category)) return '⭐';
      return CATEGORY_ICONS[category] || '🏷️';
    }

    function getQuickGameCompactSummary(config) {
      const normalized = normalizeQuickGameConfig(config);
      const modeIcon = normalized.mode === 'teams' ? '🤝' : '🏆';
      const playerIcon = `👥${getQuickGamePlayerCount(normalized)}`;
      const categoryIcons = normalized.selectedCategories.map(getQuickGameCategoryIcon).join(' ');
      const roundsIcon = `🔁${normalized.rounds}`;
      const challengeIcon = normalized.randomChallenge ? '🎯' : '🚫';
      return [modeIcon, playerIcon, categoryIcons, roundsIcon, challengeIcon].filter(Boolean).join(' | ');
    }

    function renderQuickGameSummary() {
      const summary = document.getElementById('quick-game-summary');
      if (!summary) return;
      const config = loadQuickGameConfig();
      const fullSummary = getQuickGameSummary(config);
      summary.textContent = getQuickGameCompactSummary(config);
      summary.title = fullSummary;
      summary.setAttribute('aria-label', fullSummary);
      const button = summary.closest('button');
      if (button) button.title = fullSummary;
    }

    function getMultiDeviceHomeConnectionCount() {
      if (isHostSessionOpen()) return multiDeviceState.connections.filter(conn => conn.open).slice(0, 1).length;
      if (isGuestSessionOpen()) return 1;
      return 0;
    }

    function renderMultiDeviceHomeSummary() {
      const summary = document.getElementById('multi-device-summary');
      if (!summary) return;
      const isOnline = isHostSessionOpen() || isGuestSessionOpen();
      const count = getMultiDeviceHomeConnectionCount();
      const status = t(isOnline ? 'home.multiDeviceOnline' : 'home.multiDeviceOffline');
      const text = t('home.multiDeviceSummary', { status, count });
      const dot = document.createElement('span');
      dot.className = `connection-status-dot ${isOnline ? 'is-online' : 'is-offline'}`;
      dot.setAttribute('aria-hidden', 'true');
      summary.replaceChildren(dot, document.createTextNode(text));
      summary.title = text;
      summary.setAttribute('aria-label', text);
      const button = summary.closest('button');
      if (button) button.title = `${t('home.multiDeviceGame')} | ${text}`;
    }

    function syncTeamNamesForLanguage(previousLanguage, nextLanguage) {
      ['A', 'B'].forEach(team => {
        const previousDefault = getDefaultTeamName(team, previousLanguage);
        const nextDefault = getDefaultTeamName(team, nextLanguage);
        if (!gameState.teamNames[team] || gameState.teamNames[team] === previousDefault || isDefaultTeamName(gameState.teamNames[team], team)) {
          gameState.teamNames[team] = nextDefault;
        }
      });
    }

    function normalizeRandomChallengeSetting(value) {
      return typeof value === 'boolean' ? value : true;
    }

    let gameState = {
      gameType: 'mime',
      mode: 'teams',
      difficulty: 'easy',
      teams: { A: [], B: [] },
      players: [],
      teamNames: { A: getDefaultTeamName('A'), B: getDefaultTeamName('B') },
      scores: {},
      currentPlayerIdx: 0,
      currentRound: 1,
      totalRounds: 3,
      currentWord: null,
      currentChallenge: null,
      usedWords: [],
      timerDur: 60,
      prepareDur: 3,
      timerInterval: null,
      memInterval: null,
      memorizeLeft: 3,
      timerLeft: 60,
      phase: 'preparing',
      totalTurns: 0,
      turnsDone: 0,
      leaderboardRecorded: false,
      randomChallenge: true,
      selectedCategories: getDefaultSelectedCategories()
    };

    const multiDeviceState = {
      role: 'single',
      peer: null,
      peerId: '',
      hostPeerId: '',
      hostConnection: null,
      guestConnectionStatus: 'disconnected',
      connections: [],
      assignment: '',
      sessionUrl: '',
      lastPayload: null,
      wakeLock: null,
      guestReconnectTimer: 0,
      guestReconnectAttempt: 0,
      hostRecoveryTimer: 0,
      hostRecoveryAttempt: 0
    };
    const musicState = {
      audio: null,
      currentSrc: '',
      currentKind: '',
      unlocked: false
    };

    let deferredPWAInstallPrompt = null;
    let wbCat = 'trocadilhos';
    let wbPreviewPackId = '';
    let leaderboardFilters = { mode: 'all' };

    // ============================================================
    // STARS
    // ============================================================
    (function () {
      const c = document.getElementById('stars');
      for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const sz = Math.random() * 2.5 + 0.5;
        s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${(Math.random() * 4 + 2).toFixed(1)}s;--del:${(Math.random() * 4).toFixed(1)}s;--op:${(Math.random() * 0.5 + 0.3).toFixed(2)}`;
        c.appendChild(s);
      }
    })();

    // ============================================================
    // I18N
    // ============================================================
    function applyTranslations() {
      document.documentElement.lang = LANGUAGE_HTML_MAP[currentLanguage] || LANGUAGE_HTML_MAP[DEFAULT_LANGUAGE];
      document.title = t('meta.documentTitle');

      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
      });

      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.dataset.i18nTitle);
      });

      document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
      });

      const languageSelect = document.getElementById('language-select');
      if (languageSelect) languageSelect.value = currentLanguage;
    }

    function refreshLocalizedUI() {
      applyTranslations();
      refreshGameTypeUI();
      renderQuickGameSummary();
      renderMultiDeviceHomeSummary();
      updateTeamLabels();
      renderCategorySelection();
      renderSetupPlayers();
      updateDiffWordCount();
      syncWBCatUI();
      renderWordBank();
      renderChallengeBank();
      renderInstalledPacks();
      renderPackPreview();
      renderUserId();
      refreshCurrentTurnCopy();
      refreshScoreScreenCopy();
      refreshFinalScreenCopy();
      renderScoreMini();
      if (document.getElementById('screen-leaderboard')?.classList.contains('active')) renderLeaderboard();
      if (document.getElementById('screen-score-manager')?.classList.contains('active')) renderScoreManager();
      if (document.getElementById('screen-guest')?.classList.contains('active') && multiDeviceState.lastPayload) {
        renderGuestSessionState(multiDeviceState.lastPayload);
      }
      renderGuestConnectionStatus();
      updateScoreManagerButton();
      updateTimerLabel(document.getElementById('timer-slider').value);
      updateFullscreenButton();
    }

    function setLanguage(language, options = {}) {
      const { save = false } = options;
      const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
      const previousLanguage = currentLanguage;
      currentLanguage = nextLanguage;
      syncTeamNamesForLanguage(previousLanguage, nextLanguage);
      refreshLocalizedUI();
      setUserIdImportStatus();
      if (save) saveSettings();
    }

    // ============================================================
    // NAVIGATION
    // ============================================================
    function resetViewportToTop(screenEl) {
      if (screenEl) screenEl.scrollTop = 0;
      const scrollingElement = document.scrollingElement || document.documentElement;
      if (scrollingElement) {
        scrollingElement.scrollTop = 0;
        scrollingElement.scrollLeft = 0;
      }
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        if (screenEl) screenEl.scrollTop = 0;
        if (scrollingElement) {
          scrollingElement.scrollTop = 0;
          scrollingElement.scrollLeft = 0;
        }
        window.scrollTo(0, 0);
      });
    }

    function goTo(screen) {
      const nextScreen = document.getElementById('screen-' + screen);
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      nextScreen.classList.add('active');
      document.body.dataset.activeScreen = screen;
      if (screen === 'wordbank') {
        wbCat = 'trocadilhos';
        syncWBCatUI();
        renderWordBank();
        renderChallengeBank();
        renderInstalledPacks();
        renderPackPreview();
      }
      if (screen === 'setup') {
        refreshGameTypeUI();
        renderSetupPlayers();
        updateDiffWordCount();
        renderCategorySelection();
      }
      if (screen === 'multidevice') {
        restoreMultiDeviceScreenState();
      }
      if (screen === 'leaderboard') {
        renderLeaderboard();
      }
      updateBackgroundMusic();
      resetViewportToTop(nextScreen);
      syncWakeLock(`screen-${screen}`);
    }

    function getFullscreenElement() {
      return document.fullscreenElement || document.webkitFullscreenElement || null;
    }

    function isFullscreenSupported() {
      const root = document.documentElement;
      const canRequest = Boolean(root.requestFullscreen || root.webkitRequestFullscreen);
      const canExit = Boolean(document.exitFullscreen || document.webkitExitFullscreen);
      const isEnabled = document.fullscreenEnabled !== false && document.webkitFullscreenEnabled !== false;
      return Boolean(canRequest && canExit && isEnabled);
    }

    function updateFullscreenButton() {
      const button = document.getElementById('fullscreen-toggle');
      if (!button) return;
      button.hidden = !isFullscreenSupported();
      const labelKey = getFullscreenElement() ? 'home.exitFullscreen' : 'home.enterFullscreen';
      const label = t(labelKey);
      button.title = label;
      button.setAttribute('aria-label', label);
    }

    async function toggleFullscreen() {
      if (!isFullscreenSupported()) {
        showNotif(t('notifications.fullscreenUnavailable'), 'var(--accent2)', 'var(--text)');
        return;
      }

      try {
        if (getFullscreenElement()) {
          const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
          await exitFullscreen.call(document);
        } else {
          const root = document.documentElement;
          const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen;
          await requestFullscreen.call(root);
        }
      } catch (error) {
        showNotif(t('notifications.fullscreenUnavailable'), 'var(--accent2)', 'var(--text)');
      } finally {
        updateFullscreenButton();
      }
    }

    function isPWAStandalone() {
      return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
    }

    function updatePWAInstallButton() {
      const button = document.getElementById('pwa-install-button');
      if (!button) return;
      button.classList.toggle('hidden', !deferredPWAInstallPrompt || isPWAStandalone());
    }

    async function installPWA() {
      if (!deferredPWAInstallPrompt || isPWAStandalone()) {
        updatePWAInstallButton();
        return;
      }
      const promptEvent = deferredPWAInstallPrompt;
      deferredPWAInstallPrompt = null;
      updatePWAInstallButton();
      try {
        await promptEvent.prompt();
        await promptEvent.userChoice;
      } catch (e) { }
    }

    // ============================================================
    // WAKE LOCK
    // ============================================================
    function shouldKeepScreenAwake() {
      const activeScreen = document.body.dataset.activeScreen || 'home';
      if (!WAKE_LOCK_ACTIVE_SCREENS.includes(activeScreen)) return false;
      if (activeScreen === 'guest') return true;
      if (activeScreen === 'multidevice') return multiDeviceState.role !== 'single';
      if (multiDeviceState.role === 'host') return true;
      return Boolean(gameState.players.length && gameState.totalTurns);
    }

    async function releaseWakeLock() {
      const sentinel = multiDeviceState.wakeLock;
      multiDeviceState.wakeLock = null;
      if (!sentinel) return;
      try {
        await sentinel.release();
      } catch (e) { }
    }

    async function requestWakeLock(reason = 'screen-change') {
      if (!('wakeLock' in navigator) || document.hidden || !shouldKeepScreenAwake()) return;
      if (multiDeviceState.wakeLock && multiDeviceState.wakeLock.released === false) return;

      try {
        const sentinel = await navigator.wakeLock.request('screen');
        multiDeviceState.wakeLock = sentinel;
        sentinel.addEventListener('release', () => {
          if (multiDeviceState.wakeLock === sentinel) multiDeviceState.wakeLock = null;
          if (!document.hidden && shouldKeepScreenAwake()) {
            requestAnimationFrame(() => requestWakeLock(`${reason}-released`));
          }
        });
      } catch (e) { }
    }

    function syncWakeLock(reason = 'screen-change') {
      if (document.hidden || !shouldKeepScreenAwake()) {
        releaseWakeLock();
        return;
      }
      requestWakeLock(reason);
    }

    // ============================================================
    // MULTI DEVICE
    // ============================================================
    function isPeerAvailable() {
      return typeof window.Peer === 'function';
    }

    function saveGuestReconnectTarget(hostId) {
      if (!hostId) return;
      try {
        localStorage.setItem(MULTI_DEVICE_GUEST_RESUME_KEY, JSON.stringify({
          hostId,
          savedAt: Date.now()
        }));
      } catch (e) { }
    }

    function loadGuestReconnectTarget() {
      try {
        const raw = localStorage.getItem(MULTI_DEVICE_GUEST_RESUME_KEY);
        if (!raw) return '';
        const parsed = JSON.parse(raw);
        const hostId = extractSessionCode(parsed?.hostId || '');
        const savedAt = Number(parsed?.savedAt) || 0;
        if (!hostId || !savedAt || (Date.now() - savedAt) > MULTI_DEVICE_GUEST_RESUME_TTL_MS) {
          localStorage.removeItem(MULTI_DEVICE_GUEST_RESUME_KEY);
          return '';
        }
        return hostId;
      } catch (e) {
        return '';
      }
    }

    function clearGuestReconnectTarget() {
      try {
        localStorage.removeItem(MULTI_DEVICE_GUEST_RESUME_KEY);
      } catch (e) { }
    }

    function clearGuestReconnectTimer() {
      if (!multiDeviceState.guestReconnectTimer) return;
      window.clearTimeout(multiDeviceState.guestReconnectTimer);
      multiDeviceState.guestReconnectTimer = 0;
    }

    function clearHostRecoveryTimer() {
      if (!multiDeviceState.hostRecoveryTimer) return;
      window.clearTimeout(multiDeviceState.hostRecoveryTimer);
      multiDeviceState.hostRecoveryTimer = 0;
    }

    function setJoinStatus(keyOrText) {
      const el = document.getElementById('multidevice-join-status');
      if (!el) return;
      el.textContent = keyOrText.includes('.') ? t(keyOrText) : keyOrText;
    }

    function setHostStatus(keyOrText) {
      const el = document.getElementById('multidevice-host-status');
      if (!el) return;
      el.textContent = keyOrText.includes('.') ? t(keyOrText) : keyOrText;
    }

    function renderGuestConnectionStatus() {
      const el = document.getElementById('guest-connection-status');
      if (!el) return;
      const statusKey = multiDeviceState.guestConnectionStatus === 'connected'
        ? 'multiDevice.online'
        : multiDeviceState.guestConnectionStatus === 'disconnected'
          ? 'multiDevice.offline'
          : 'multiDevice.connecting';
      el.textContent = t(statusKey);
      el.dataset.connectionStatus = multiDeviceState.guestConnectionStatus;
      const reconnectButton = document.getElementById('guest-reconnect-button');
      if (reconnectButton) {
        const shouldShowReconnect = multiDeviceState.role === 'guest'
          && multiDeviceState.guestConnectionStatus === 'disconnected'
          && Boolean(multiDeviceState.hostPeerId);
        reconnectButton.classList.toggle('hidden', !shouldShowReconnect);
      }
    }

    function setGuestConnectionStatus(status) {
      multiDeviceState.guestConnectionStatus = status;
      renderGuestConnectionStatus();
    }

    function getSessionUrl(peerId) {
      const url = new URL(window.location.href);
      url.search = '';
      url.hash = '';
      url.searchParams.set('join', peerId);
      return url.toString();
    }

    function extractSessionCode(value = '') {
      const raw = String(value).trim();
      if (!raw) return '';
      try {
        const url = new URL(raw, window.location.href);
        const join = url.searchParams.get('join');
        if (join) return join.trim();
      } catch (e) { }
      return raw.replace(/^#?join=/i, '').trim();
    }

    function renderSessionQRCode(url) {
      const host = document.getElementById('multidevice-qr');
      if (!host) return;
      host.innerHTML = '';
      if (typeof window.QRCode !== 'function') {
        host.textContent = t('multiDevice.qrUnavailable');
        return;
      }
      new window.QRCode(host, {
        text: url,
        width: 168,
        height: 168,
        colorDark: '#111827',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel?.M
      });
    }

    function updateHostGuestCount() {
      const count = multiDeviceState.connections.filter(conn => conn.open).slice(0, 1).length;
      const el = document.getElementById('multidevice-guest-count');
      if (el) el.textContent = t('multiDevice.guestsConnected', { count });
      renderMultiDeviceHomeSummary();
      renderCompanionAssignmentControl();
    }

    function closeCurrentPeer(options = {}) {
      const { nextRole = 'single', keepLastPayload = false } = options;
      const preservedLastPayload = keepLastPayload ? multiDeviceState.lastPayload : null;
      clearGuestReconnectTimer();
      clearHostRecoveryTimer();
      try {
        multiDeviceState.connections.forEach(conn => conn.close?.());
        multiDeviceState.hostConnection?.close?.();
        multiDeviceState.peer?.destroy?.();
      } catch (e) { }
      multiDeviceState.role = nextRole;
      multiDeviceState.peer = null;
      multiDeviceState.hostConnection = null;
      multiDeviceState.guestConnectionStatus = 'disconnected';
      multiDeviceState.connections = [];
      multiDeviceState.peerId = '';
      multiDeviceState.hostPeerId = '';
      multiDeviceState.sessionUrl = '';
      multiDeviceState.lastPayload = preservedLastPayload;
      renderMultiDeviceHomeSummary();
      renderGuestConnectionStatus();
      syncWakeLock('peer-closed');
    }

    function isCurrentPeerOpen() {
      const peer = multiDeviceState.peer;
      return Boolean(peer && !peer.destroyed && peer.disconnected !== true);
    }

    function isHostSessionOpen() {
      return multiDeviceState.role === 'host' && isCurrentPeerOpen() && Boolean(multiDeviceState.peerId && multiDeviceState.sessionUrl);
    }

    function isGuestSessionOpen() {
      return multiDeviceState.role === 'guest' && isCurrentPeerOpen() && Boolean(multiDeviceState.hostConnection?.open);
    }

    function resetMultiDeviceChoice() {
      document.getElementById('multidevice-choice-card')?.classList.remove('hidden');
      document.getElementById('multidevice-host-card')?.classList.add('hidden');
      document.getElementById('multidevice-host-panel')?.classList.add('hidden');
      document.getElementById('multidevice-join-card')?.classList.add('hidden');
    }

    function selectMultiDeviceMode(mode) {
      document.getElementById('multidevice-choice-card')?.classList.add('hidden');
      document.getElementById('multidevice-host-card')?.classList.toggle('hidden', mode !== 'host');
      document.getElementById('multidevice-host-panel')?.classList.add('hidden');
      document.getElementById('multidevice-join-card')?.classList.toggle('hidden', mode !== 'join');
      if (mode === 'join') {
        requestAnimationFrame(() => document.getElementById('multidevice-join-code')?.focus());
      }
    }

    function showExistingHostSession() {
      selectMultiDeviceMode('host');
      document.getElementById('multidevice-host-panel')?.classList.remove('hidden');
      document.getElementById('multidevice-session-code').textContent = multiDeviceState.peerId;
      document.getElementById('multidevice-link').value = multiDeviceState.sessionUrl;
      renderSessionQRCode(multiDeviceState.sessionUrl);
      setHostStatus(isHostSessionOpen() ? 'multiDevice.hostReady' : 'multiDevice.reconnecting');
      updateHostGuestCount();
    }

    function showExistingGuestSession() {
      selectMultiDeviceMode('join');
      const input = document.getElementById('multidevice-join-code');
      const hostCode = multiDeviceState.hostPeerId || multiDeviceState.hostConnection?.peer || '';
      if (input) input.value = hostCode;
      setJoinStatus(multiDeviceState.guestConnectionStatus === 'connected'
        ? 'multiDevice.connected'
        : 'multiDevice.reconnecting');
    }

    function restoreMultiDeviceScreenState() {
      if (isHostSessionOpen()) {
        showExistingHostSession();
        return;
      }
      if (multiDeviceState.role === 'host' && multiDeviceState.peerId) {
        showExistingHostSession();
        return;
      }
      if (isGuestSessionOpen()) {
        showExistingGuestSession();
        return;
      }
      if (multiDeviceState.role === 'guest' && multiDeviceState.hostPeerId) {
        showExistingGuestSession();
        return;
      }
      resetMultiDeviceChoice();
    }

    function disconnectGuestSession() {
      clearGuestReconnectTarget();
      multiDeviceState.guestReconnectAttempt = 0;
      closeCurrentPeer();
      setGuestConnectionStatus('disconnected');
      document.getElementById('guest-round-title').textContent = t('multiDevice.waitingTitle');
      document.getElementById('guest-current-player-label').textContent = t('multiDevice.guestWaiting');
      document.getElementById('guest-current-player-name').textContent = '--';
      document.getElementById('guest-joke-card')?.classList.add('hidden');
      document.getElementById('guest-timer-card')?.classList.remove('hidden');
      updateGuestTimerDisplay(NaN, 1);
      goTo('home');
    }

    function scheduleGuestReconnect(reason = 'connection-lost') {
      if (multiDeviceState.role !== 'guest' || !multiDeviceState.hostPeerId) return;
      clearGuestReconnectTimer();
      setJoinStatus('multiDevice.reconnecting');
      const delay = Math.min(1000 * (multiDeviceState.guestReconnectAttempt + 1), MULTI_DEVICE_RECONNECT_MAX_DELAY_MS);
      multiDeviceState.guestReconnectTimer = window.setTimeout(() => {
        connectToMultiDeviceHost(multiDeviceState.hostPeerId, { isAutoReconnect: true, reason });
      }, delay);
    }

    function scheduleHostRecovery(reason = 'connection-lost') {
      if (multiDeviceState.role !== 'host' || !multiDeviceState.peerId) return;
      clearHostRecoveryTimer();
      setHostStatus('multiDevice.reconnecting');
      const delay = Math.min(1000 * (multiDeviceState.hostRecoveryAttempt + 1), MULTI_DEVICE_RECONNECT_MAX_DELAY_MS);
      multiDeviceState.hostRecoveryTimer = window.setTimeout(() => {
        createMultiDeviceHost({
          preferredPeerId: multiDeviceState.peerId,
          isRecovery: true,
          reason
        });
      }, delay);
    }

    function sendToGuest(conn, message) {
      if (!conn?.open) return;
      try {
        conn.send(message);
      } catch (e) { }
    }

    function broadcastMultiDeviceMessage(message) {
      if (multiDeviceState.role !== 'host') return;
      multiDeviceState.connections = multiDeviceState.connections.filter(conn => conn.open);
      multiDeviceState.connections.forEach(conn => sendToGuest(conn, message));
      updateHostGuestCount();
    }

    function getCurrentPlayerForGuest() {
      const player = gameState.players[gameState.currentPlayerIdx];
      if (!player) return { name: '--', teamLabel: '' };
      return {
        name: player.name || player,
        teamLabel: player.team ? (gameState.teamNames[player.team] || getDefaultTeamName(player.team)) : ''
      };
    }

    function getGuestStatusKey(phase = 'waiting') {
      if (phase === 'preparing') return 'guestPreparing';
      if (phase === 'memorizing') return 'guestMemorizing';
      if (phase === 'playing') return 'guestPlaying';
      if (phase === 'score') return 'guestScore';
      if (phase === 'final') return 'guestFinal';
      return 'guestWaiting';
    }

    function buildHostGamePayload() {
      const hasStarted = Boolean(gameState.players.length && gameState.totalTurns);
      const phase = hasStarted ? gameState.phase : 'waiting';
      const currentPlayer = getCurrentPlayerForGuest();
      const isMemorizing = phase === 'memorizing';
      const isPlaying = phase === 'playing';
      const showJokeOnCompanion = shouldPresentJokeOnCompanion();
      const payload = {
        phase,
        gameType: gameState.gameType,
        timerLeft: isMemorizing
          ? gameState.memorizeLeft
          : (isPlaying ? gameState.timerLeft : gameState.timerDur),
        timerDur: isMemorizing ? gameState.prepareDur : gameState.timerDur,
        currentRound: hasStarted ? gameState.currentRound : 0,
        totalRounds: hasStarted ? gameState.totalRounds : 0,
        deviceMode: showJokeOnCompanion ? 'joke' : 'timer',
        statusKey: getGuestStatusKey(phase),
        currentPlayerName: currentPlayer.name,
        teamLabel: currentPlayer.teamLabel,
        jokeText: showJokeOnCompanion ? (gameState.currentWord?.word || '') : '',
        challengeText: showJokeOnCompanion ? (gameState.currentChallenge || '') : ''
      };
      return payload;
    }

    function broadcastHostGameState(options = {}) {
      if (multiDeviceState.role !== 'host') return;
      const payload = buildHostGamePayload(options);
      multiDeviceState.lastPayload = payload;
      broadcastMultiDeviceMessage({ type: 'session-state', payload });
    }

    function attachHostConnection(conn) {
      const existing = multiDeviceState.connections.find(item => item.open);
      if (existing && existing !== conn) {
        try {
          existing.close?.();
        } catch (e) { }
      }
      multiDeviceState.connections = [conn];
      const syncGuest = () => {
        updateHostGuestCount();
        refreshCurrentTurnCopy();
        sendToGuest(conn, { type: 'session-state', payload: buildHostGamePayload() });
      };
      conn.on('open', syncGuest);
      conn.on('close', () => {
        multiDeviceState.connections = multiDeviceState.connections.filter(item => item !== conn && item.open);
        updateHostGuestCount();
        refreshCurrentTurnCopy();
        broadcastHostGameState();
      });
      conn.on('error', () => {
        multiDeviceState.connections = multiDeviceState.connections.filter(item => item !== conn && item.open);
        updateHostGuestCount();
      });
      conn.on('data', data => {
        if (data?.type === 'guest-ready') syncGuest();
      });
      setTimeout(syncGuest, 200);
    }

    function createMultiDeviceHost(options = {}) {
      const { preferredPeerId = '', isRecovery = false } = options;
      if (!isPeerAvailable()) {
        showNotif(t('multiDevice.peerUnavailable'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }

      const previousPeerId = preferredPeerId || multiDeviceState.peerId;
      const previousSessionUrl = previousPeerId ? getSessionUrl(previousPeerId) : multiDeviceState.sessionUrl;
      closeCurrentPeer({ nextRole: 'host' });
      multiDeviceState.peerId = previousPeerId || '';
      multiDeviceState.sessionUrl = previousSessionUrl || '';
      document.getElementById('multidevice-host-panel')?.classList.remove('hidden');
      setHostStatus(isRecovery ? 'multiDevice.reconnecting' : 'multiDevice.hostCreating');
      updateHostGuestCount();
      syncWakeLock('host-session-start');

      const peer = previousPeerId ? new window.Peer(previousPeerId) : new window.Peer();
      multiDeviceState.peer = peer;
      peer.on('open', id => {
        if (multiDeviceState.peer !== peer) return;
        clearHostRecoveryTimer();
        multiDeviceState.hostRecoveryAttempt = 0;
        multiDeviceState.peerId = id;
        multiDeviceState.sessionUrl = getSessionUrl(id);
        document.getElementById('multidevice-session-code').textContent = id;
        document.getElementById('multidevice-link').value = multiDeviceState.sessionUrl;
        renderSessionQRCode(multiDeviceState.sessionUrl);
        setHostStatus('multiDevice.hostReady');
        renderMultiDeviceHomeSummary();
        broadcastHostGameState();
      });
      peer.on('connection', conn => {
        if (multiDeviceState.peer !== peer) {
          try {
            conn.close?.();
          } catch (e) { }
          return;
        }
        attachHostConnection(conn);
      });
      peer.on('disconnected', () => {
        if (multiDeviceState.peer !== peer || multiDeviceState.role !== 'host') return;
        multiDeviceState.hostRecoveryAttempt += 1;
        renderMultiDeviceHomeSummary();
        scheduleHostRecovery('peer-disconnected');
      });
      peer.on('close', () => {
        if (multiDeviceState.peer !== peer || multiDeviceState.role !== 'host') return;
        multiDeviceState.hostRecoveryAttempt += 1;
        renderMultiDeviceHomeSummary();
        scheduleHostRecovery('peer-closed');
      });
      peer.on('error', () => {
        if (multiDeviceState.peer !== peer || multiDeviceState.role !== 'host') return;
        multiDeviceState.hostRecoveryAttempt += 1;
        renderMultiDeviceHomeSummary();
        if (isRecovery) {
          scheduleHostRecovery('peer-error');
          return;
        }
        setHostStatus('multiDevice.hostError');
        showNotif(t('multiDevice.hostError'), 'var(--accent1)', 'var(--btn-danger-text)');
      });
    }

    function connectToMultiDeviceHost(rawCode, options = {}) {
      const { isAutoReconnect = false } = options;
      const hostId = extractSessionCode(rawCode);
      if (!hostId) {
        setJoinStatus('multiDevice.missingSession');
        return;
      }
      if (!isPeerAvailable()) {
        setJoinStatus('multiDevice.peerUnavailable');
        showNotif(t('multiDevice.peerUnavailable'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }

      if (multiDeviceState.role === 'guest' && multiDeviceState.hostPeerId === hostId && isGuestSessionOpen()) {
        sendToGuest(multiDeviceState.hostConnection, { type: 'guest-ready' });
        return;
      }

      closeCurrentPeer({ nextRole: 'guest', keepLastPayload: isAutoReconnect });
      multiDeviceState.hostPeerId = hostId;
      multiDeviceState.guestReconnectAttempt = isAutoReconnect ? multiDeviceState.guestReconnectAttempt : 0;
      saveGuestReconnectTarget(hostId);
      setJoinStatus(isAutoReconnect ? 'multiDevice.reconnecting' : 'multiDevice.connecting');
      setGuestConnectionStatus('connecting');
      syncWakeLock('guest-session-start');
      if (!document.getElementById('screen-guest')?.classList.contains('active')) goTo('guest');

      const peer = new window.Peer();
      multiDeviceState.peer = peer;
      peer.on('open', () => {
        if (multiDeviceState.peer !== peer) return;
        const conn = peer.connect(hostId, { reliable: true });
        multiDeviceState.hostConnection = conn;
        attachGuestConnection(conn);
      });
      peer.on('disconnected', () => {
        if (multiDeviceState.peer !== peer || multiDeviceState.role !== 'guest') return;
        setGuestConnectionStatus('disconnected');
        renderMultiDeviceHomeSummary();
        multiDeviceState.guestReconnectAttempt += 1;
        scheduleGuestReconnect('peer-disconnected');
      });
      peer.on('close', () => {
        if (multiDeviceState.peer !== peer || multiDeviceState.role !== 'guest') return;
        setGuestConnectionStatus('disconnected');
        renderMultiDeviceHomeSummary();
        multiDeviceState.guestReconnectAttempt += 1;
        scheduleGuestReconnect('peer-closed');
      });
      peer.on('error', () => {
        if (multiDeviceState.peer !== peer || multiDeviceState.role !== 'guest') return;
        setGuestConnectionStatus('disconnected');
        renderMultiDeviceHomeSummary();
        multiDeviceState.guestReconnectAttempt += 1;
        scheduleGuestReconnect('peer-error');
      });
    }

    function attachGuestConnection(conn) {
      conn.on('open', () => {
        if (multiDeviceState.hostConnection !== conn) return;
        clearGuestReconnectTimer();
        multiDeviceState.guestReconnectAttempt = 0;
        setGuestConnectionStatus('connected');
        setJoinStatus('multiDevice.connected');
        renderMultiDeviceHomeSummary();
        sendToGuest(conn, { type: 'guest-ready' });
      });
      conn.on('data', handleGuestMessage);
      conn.on('close', () => {
        if (multiDeviceState.hostConnection !== conn) return;
        multiDeviceState.hostConnection = null;
        setGuestConnectionStatus('disconnected');
        renderMultiDeviceHomeSummary();
        multiDeviceState.guestReconnectAttempt += 1;
        scheduleGuestReconnect('connection-closed');
      });
      conn.on('error', () => {
        if (multiDeviceState.hostConnection !== conn) return;
        multiDeviceState.hostConnection = null;
        setGuestConnectionStatus('disconnected');
        renderMultiDeviceHomeSummary();
        multiDeviceState.guestReconnectAttempt += 1;
        scheduleGuestReconnect('connection-error');
      });
    }

    function handleGuestMessage(message) {
      if (message?.type === 'session-state') {
        renderGuestSessionState(message.payload || {});
      }
    }

    function updateGuestTimerDisplay(left, total) {
      const num = document.getElementById('guest-timer-num');
      const circle = document.getElementById('guest-timer-circle');
      if (!num || !circle) return;
      const safeTotal = Math.max(1, Number(total) || 1);
      const safeLeft = Math.max(0, Number(left) || 0);
      num.textContent = Number.isFinite(Number(left)) ? safeLeft : '--';
      circle.style.strokeDashoffset = 427.3 - (safeLeft / safeTotal) * 427.3;
      circle.style.stroke = safeLeft > safeTotal * 0.5
        ? getThemeVar('--timer-color-safe')
        : safeLeft > safeTotal * 0.25
          ? getThemeVar('--timer-color-warning')
          : getThemeVar('--timer-color-danger');
    }

    function getGuestRoundText(payload = {}) {
      const current = Number.parseInt(payload.currentRound, 10);
      const total = Number.parseInt(payload.totalRounds, 10);
      if (payload.phase !== 'waiting' && current > 0 && total > 0) {
        return t('dynamic.roundDisplay', { current, total });
      }
      return t('multiDevice.waitingTitle');
    }

    function getGuestStatusText(payload = {}) {
      const statusKey = payload.statusKey || getGuestStatusKey(payload.phase);
      return t(`multiDevice.${statusKey}`);
    }

    function renderGuestSessionState(payload) {
      multiDeviceState.lastPayload = payload;
      if (!document.getElementById('screen-guest').classList.contains('active')) goTo('guest');
      document.getElementById('guest-round-title').textContent = getGuestRoundText(payload);
      const shouldShowJoke = payload.deviceMode === 'joke' && Boolean(payload.jokeText);
      document.getElementById('guest-current-player-label').textContent = shouldShowJoke
        ? t('multiDevice.guestJokeTurn')
        : getGuestStatusText(payload);
      document.getElementById('guest-current-player-name').textContent = payload.phase === 'waiting' ? '--' : (payload.currentPlayerName || '--');
      updateGuestTimerDisplay(payload.timerLeft, payload.timerDur);

      const timerCard = document.getElementById('guest-timer-card');
      const jokeCard = document.getElementById('guest-joke-card');
      const challengeEl = document.getElementById('guest-challenge-display');
      const challengeTextEl = document.getElementById('guest-challenge-text');
      timerCard?.classList.toggle('hidden', shouldShowJoke);
      jokeCard?.classList.toggle('hidden', !shouldShowJoke);
      if (shouldShowJoke) {
        document.getElementById('guest-word-display').textContent = payload.jokeText || '---';
        if (payload.challengeText) {
          if (challengeTextEl) challengeTextEl.textContent = payload.challengeText;
          challengeEl?.classList.remove('hidden');
        } else {
          challengeEl?.classList.add('hidden');
        }
      } else {
        challengeEl?.classList.add('hidden');
      }
    }

    async function copyMultiDeviceLink() {
      if (!multiDeviceState.sessionUrl) return;
      try {
        await copyTextToClipboard(multiDeviceState.sessionUrl);
        showNotif(t('multiDevice.linkCopied'));
      } catch (e) {
        showNotif(t('notifications.shareCopyFailed'), 'var(--accent2)', 'var(--text)');
      }
    }

    function initializeMultiDeviceJoinFromUrl() {
      const urlCode = new URL(window.location.href).searchParams.get('join');
      const savedCode = loadGuestReconnectTarget();
      const code = urlCode || savedCode;
      if (!code) return;
      const input = document.getElementById('multidevice-join-code');
      if (input) input.value = code;
      selectMultiDeviceMode('join');
      connectToMultiDeviceHost(code, { isAutoReconnect: Boolean(savedCode && !urlCode) });
    }

    function refreshMultiDevicePresence(reason = 'resume') {
      if (multiDeviceState.role === 'guest') {
        if (isGuestSessionOpen()) {
          clearGuestReconnectTimer();
          sendToGuest(multiDeviceState.hostConnection, { type: 'guest-ready' });
          return;
        }
        if (multiDeviceState.hostPeerId) {
          connectToMultiDeviceHost(multiDeviceState.hostPeerId, { isAutoReconnect: true, reason });
        }
        return;
      }

      if (multiDeviceState.role === 'host') {
        if (isHostSessionOpen()) {
          clearHostRecoveryTimer();
          broadcastHostGameState();
          return;
        }
        if (multiDeviceState.peerId) {
          createMultiDeviceHost({
            preferredPeerId: multiDeviceState.peerId,
            isRecovery: true,
            reason
          });
        }
      }
    }

    function getThemeVar(name) {
      return getComputedStyle(document.body).getPropertyValue(name).trim();
    }

    // ============================================================
    // NOTIFICATIONS
    // ============================================================
    function showNotif(msg, color = 'var(--accent3)', textColor = 'var(--notif-text)') {
      const el = document.getElementById('notif');
      el.textContent = msg;
      el.style.background = color;
      el.style.color = textColor;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 2400);
    }

    function renderUserId() {
      const input = document.getElementById('user-id-display');
      if (input) input.value = appUserId;
    }

    function setUserIdImportStatus(message = '', type = '') {
      const el = document.getElementById('user-id-import-status');
      if (!el) return;
      el.textContent = message;
      el.classList.remove('success', 'error');
      if (type) el.classList.add(type);
    }

    function isValidImportedUserId(userId) {
      return typeof userId === 'string'
        && userId.length >= 8
        && userId.length <= 160
        && /^[A-Za-z0-9._:-]+$/.test(userId);
    }

    function createUserIdBackupEnvelope(userId = appUserId) {
      return {
        schema: USER_ID_BACKUP_SCHEMA,
        app: 'NaoPodeRir',
        version: 1,
        exported_at: new Date().toISOString(),
        user_id: userId
      };
    }

    function downloadJsonFile(filename, payload) {
      const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    }

    function exportUserId() {
      const dateToken = new Date().toISOString().slice(0, 10);
      downloadJsonFile(`nao-pode-rir-user-id-${dateToken}.json`, createUserIdBackupEnvelope());
      setUserIdImportStatus(t('notifications.userIdExported'), 'success');
      showNotif(t('notifications.userIdExported'));
    }

    function selectUserIdFile() {
      const input = document.getElementById('user-id-file-input');
      if (!input) return;
      input.value = '';
      input.click();
    }

    async function parseUserIdFile(file) {
      if (!file) throw new Error(t('userIdErrors.fileRequired'));
      let envelope;
      try {
        envelope = JSON.parse(await file.text());
      } catch (error) {
        throw new Error(t('userIdErrors.invalidJson'));
      }

      if (!envelope || typeof envelope !== 'object' || envelope.schema !== USER_ID_BACKUP_SCHEMA) {
        throw new Error(t('userIdErrors.invalidSchema'));
      }
      if (!isValidImportedUserId(envelope.user_id)) {
        throw new Error(t('userIdErrors.invalidUserId'));
      }
      return envelope;
    }

    async function importUserIdFile(file) {
      setUserIdImportStatus(t('notifications.packInstallReading'));
      const envelope = await parseUserIdFile(file);
      const importedUserId = envelope.user_id;

      if (importedUserId !== appUserId) {
        const shouldReplace = confirm(t('confirmations.replaceUserId', {
          currentUserId: appUserId,
          importedUserId
        }));
        if (!shouldReplace) {
          setUserIdImportStatus(t('notifications.userIdImportCancelled'));
          return null;
        }
      }

      appUserId = importedUserId;
      localStorage.setItem(USER_ID_KEY, appUserId);
      renderUserId();
      setUserIdImportStatus(t('notifications.userIdImported'), 'success');
      showNotif(t('notifications.userIdImported'));
      return appUserId;
    }

    async function handleUserIdFileSelection(file) {
      try {
        await importUserIdFile(file);
      } catch (error) {
        const message = error?.message || t('userIdErrors.invalidJson');
        setUserIdImportStatus(message, 'error');
        showNotif(message, 'var(--accent2)', 'var(--text)');
      }
    }

    async function copyUserId() {
      try {
        await navigator.clipboard.writeText(appUserId);
        showNotif(t('notifications.userIdCopied'));
      } catch (e) {
        const input = document.getElementById('user-id-display');
        input?.select();
        document.execCommand?.('copy');
        showNotif(t('notifications.userIdCopied'));
      }
    }

    function setPackInstallStatus(message = '', type = '') {
      const el = document.getElementById('pack-install-status');
      if (!el) return;
      el.textContent = message;
      el.classList.remove('success', 'error');
      if (type) el.classList.add(type);
    }

    function renderInstalledPacks() {
      const container = document.getElementById('installed-packs-list');
      if (!container) return;
      const installedPacks = (contentModel.packs || []).filter(pack => pack.source === 'downloaded');
      container.innerHTML = '';

      if (!installedPacks.length) {
        const empty = document.createElement('div');
        empty.className = 'installed-pack-empty';
        empty.textContent = t('wordbank.noInstalledPacks');
        container.appendChild(empty);
        return;
      }

      installedPacks.forEach(pack => {
        const row = document.createElement('div');
        row.className = 'installed-pack-row';
        if (pack.id === wbPreviewPackId) row.classList.add('selected');
        row.dataset.packPreviewId = pack.id;
        const name = getPackDisplayName(pack);
        const wordsCount = getPackWordCount(pack);
        const version = pack.version ? ` · ${t('dynamic.packVersion', { version: pack.version })}` : '';
        const info = document.createElement('div');
        const nameEl = document.createElement('div');
        nameEl.className = 'installed-pack-name';
        nameEl.textContent = name;
        const metaEl = document.createElement('div');
        metaEl.className = 'installed-pack-meta';
        metaEl.textContent = `${t('dynamic.packWordsSummary', { count: wordsCount })}${version}`;
        info.append(nameEl, metaEl);

        const actions = document.createElement('div');
        actions.className = 'installed-pack-actions';
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-ghost btn-sm';
        toggleButton.dataset.action = 'toggle-installed-pack';
        toggleButton.dataset.packId = pack.id;
        toggleButton.textContent = pack.enabled === false ? t('wordbank.packDisabled') : t('wordbank.packEnabled');
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-ghost btn-sm';
        removeButton.dataset.action = 'remove-installed-pack';
        removeButton.dataset.packId = pack.id;
        removeButton.textContent = t('wordbank.removePack');
        actions.append(toggleButton, removeButton);
        row.append(info, actions);
        container.appendChild(row);
      });
    }

    function getInstalledPackById(packId) {
      return (contentModel.packs || []).find(pack => pack.id === packId && pack.source === 'downloaded') || null;
    }

    function getPackPreviewWordEntries(pack, locale = currentLanguage) {
      const bank = normalizeJokeBank(pack?.jokes?.[locale] || {});
      const entries = [];
      CATEGORY_KEYS.forEach(category => {
        (bank[category] || []).forEach(joke => {
          const text = getJokeText(joke);
          if (text) entries.push({ word: text, category });
        });
      });
      return entries;
    }

    function renderPreviewItems(container, entries, emptyMessage, formatter, className = '') {
      if (!container) return;
      container.innerHTML = '';
      if (!entries.length) {
        const empty = document.createElement('div');
        empty.className = 'pack-preview-empty';
        empty.textContent = emptyMessage;
        container.appendChild(empty);
        return;
      }

      entries.forEach(entry => {
        const item = document.createElement('div');
        item.className = ['pack-preview-item', className].filter(Boolean).join(' ');
        item.textContent = formatter(entry);
        container.appendChild(item);
      });
    }

    function renderPackPreview() {
      const subtitle = document.getElementById('pack-preview-subtitle');
      const wordsContainer = document.getElementById('pack-preview-words');
      const challengesContainer = document.getElementById('pack-preview-challenges');
      if (!subtitle || !wordsContainer || !challengesContainer) return;

      const pack = getInstalledPackById(wbPreviewPackId);
      if (!pack) {
        subtitle.textContent = t('wordbank.packPreviewPrompt');
        renderPreviewItems(wordsContainer, [], t('wordbank.packPreviewNoWords'), item => item, 'pack-preview-item-joke');
        renderPreviewItems(challengesContainer, [], t('wordbank.packPreviewNoChallenges'), item => item, 'pack-preview-item-challenge');
        return;
      }

      subtitle.textContent = t('wordbank.packPreviewSelected', { name: getPackDisplayName(pack) });
      const wordEntries = getPackPreviewWordEntries(pack);
      const challenges = normalizeChallenges(pack.readingChallenges?.[currentLanguage] || []);
      renderPreviewItems(
        wordsContainer,
        wordEntries,
        t('wordbank.packPreviewNoWords'),
        entry => entry.word,
        'pack-preview-item-joke'
      );
      renderPreviewItems(
        challengesContainer,
        challenges,
        t('wordbank.packPreviewNoChallenges'),
        challenge => `🎯 ${challenge}`,
        'pack-preview-item-challenge'
      );
    }

    function selectPreviewPack(packId) {
      wbPreviewPackId = packId;
      renderInstalledPacks();
      renderPackPreview();
    }

    function getDonationUrl(platform) {
      return DONATION_LINKS[platform] || '';
    }

    function isDonationUrlConfigured(url) {
      return Boolean(url) && !/your-page/i.test(url);
    }

    function openExternalUrl(url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    function getShareUrl() {
      try {
        const url = new URL(window.location.href);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          if (['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname)) return APP_PUBLIC_URL;
          url.hash = '';
          return url.href;
        }
      } catch (error) {
        console.warn('Could not read current URL for sharing.', error);
      }

      return APP_PUBLIC_URL;
    }

    function getShareData() {
      return {
        title: t('share.title'),
        text: t('share.text'),
        url: getShareUrl()
      };
    }

    function canUseNativeShare(shareData) {
      if (!navigator.share) return false;
      if (!navigator.canShare) return true;

      try {
        return navigator.canShare(shareData);
      } catch (error) {
        console.warn('Native share capability check failed.', error);
        return false;
      }
    }

    function createPlatformShareUrl(platform, shareData) {
      const encodedUrl = encodeURIComponent(shareData.url);
      const encodedText = encodeURIComponent(shareData.text);
      const encodedMessage = encodeURIComponent(`${shareData.text} ${shareData.url}`);

      if (platform === 'whatsapp') return `https://wa.me/?text=${encodedMessage}`;
      if (platform === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      if (platform === 'x') return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

      return '';
    }

    async function copyTextToClipboard(text) {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);

      const activeElement = document.activeElement;
      textarea.focus();
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      if (activeElement?.focus) activeElement.focus();
      if (!copied) throw new Error('Clipboard fallback failed');
    }

    async function copyShareLink(notificationKey = 'notifications.shareCopied') {
      try {
        await copyTextToClipboard(getShareData().url);
        showNotif(t(notificationKey));
        return true;
      } catch (error) {
        console.warn('Share link could not be copied.', error);
        showNotif(t('notifications.shareCopyFailed'), 'var(--accent2)', 'var(--text)');
        return false;
      }
    }

    async function nativeShareApp(options = {}) {
      const { fallbackNotification = 'notifications.shareUnavailable' } = options;
      const shareData = getShareData();

      if (canUseNativeShare(shareData)) {
        try {
          await navigator.share(shareData);
          return true;
        } catch (error) {
          if (error?.name === 'AbortError') return false;
          console.warn('Native sharing failed; falling back to clipboard.', error);
        }
      }

      return copyShareLink(fallbackNotification);
    }

    async function shareToPlatform(platform) {
      const shareData = getShareData();
      const target = platform || '';

      if (target === 'copy') return copyShareLink();

      // Instagram and TikTok do not expose reliable public web share-intent URLs
      // for arbitrary app links. Use the native share sheet when supported;
      // otherwise copy the URL and open the platform so users can paste it.
      if (target === 'instagram' || target === 'tiktok') {
        const fallbackNotification = target === 'instagram'
          ? 'notifications.shareInstagramFallback'
          : 'notifications.shareTikTokFallback';
        const shared = await nativeShareApp({ fallbackNotification });
        if (!canUseNativeShare(shareData)) openExternalUrl(SOCIAL_WEB_FALLBACKS[target]);
        return shared;
      }

      const platformUrl = createPlatformShareUrl(target, shareData);
      if (platformUrl) {
        openExternalUrl(platformUrl);
        return true;
      }

      return nativeShareApp();
    }

    function loadExternalScript(src, scriptId) {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          if (existingScript.dataset.loaded === 'true') {
            resolve();
            return;
          }
          existingScript.addEventListener('load', () => resolve(), { once: true });
          existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = src;
        script.async = true;
        script.onload = () => {
          script.dataset.loaded = 'true';
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    }

    function openBuyMeACoffeeDonation() {
      const donationUrl = getDonationUrl('buyMeCoffee');
      if (isDonationUrlConfigured(donationUrl)) {
        openExternalUrl(donationUrl);
        return;
      }

      showNotif(t('notifications.donationLinkUnavailable'), 'var(--accent2)', 'var(--text)');
    }

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getKoFiWidgetTrigger() {
      const selectors = [
        'div[class*="kofi"] button',
        'div[class*="kofi"] a',
        'button[aria-label*="Support me"]',
        'button[title*="Support me"]',
        'a[aria-label*="Ko-fi"]',
        'a[href*="ko-fi.com"]'
      ];

      for (const selector of selectors) {
        const candidate = document.querySelector(selector);
        if (candidate) return candidate;
      }

      return Array.from(document.querySelectorAll('button, a')).find(el => {
        const text = (el.textContent || '').trim();
        const href = (el.getAttribute('href') || '').trim();
        const className = typeof el.className === 'string' ? el.className : '';
        return /support me/i.test(text) || /ko-?fi/i.test(text) || /ko-?fi/i.test(href) || /kofi/i.test(className);
      }) || null;
    }

    async function ensureKoFiWidgetReady() {
      await loadExternalScript(KO_FI_WIDGET_SCRIPT_URL, 'kofi-widget-script');
      if (!window.kofiWidgetOverlay?.draw) throw new Error('Ko-fi widget API unavailable');

      if (!window.__mmKoFiWidgetInitialized) {
        window.kofiWidgetOverlay.draw(KO_FI_SLUG, {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#323842',
          'floating-chat.donateButton.text-color': '#fff'
        });
        window.__mmKoFiWidgetInitialized = true;
      }
    }

    async function triggerKoFiWidget() {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const trigger = getKoFiWidgetTrigger();
        if (trigger) {
          trigger.click();
          return true;
        }
        await wait(120);
      }
      return false;
    }

    async function openKoFiDonation() {
      try {
        await ensureKoFiWidgetReady();
        if (await triggerKoFiWidget()) return;
      } catch (error) {
        console.warn('Ko-fi widget could not be initialized.', error);
      }

      const fallbackUrl = getDonationUrl('koFi');
      if (isDonationUrlConfigured(fallbackUrl)) {
        openExternalUrl(fallbackUrl);
        return;
      }

      showNotif(t('notifications.donationLinkUnavailable'), 'var(--accent2)', 'var(--text)');
    }

    function openDonationLink(platform) {
      if (platform === 'buyMeCoffee') {
        openBuyMeACoffeeDonation();
        return;
      }
      if (platform === 'koFi') {
        openKoFiDonation();
        return;
      }

      const url = getDonationUrl(platform);
      if (!isDonationUrlConfigured(url)) {
        showNotif(t('notifications.donationLinkUnavailable'), 'var(--accent2)', 'var(--text)');
        return;
      }

      openExternalUrl(url);
    }

    function applyTheme(theme = 'cosmic') {
      const nextTheme = AVAILABLE_THEMES.includes(theme) ? theme : 'cosmic';
      document.body.classList.remove(...AVAILABLE_THEMES.map(item => `theme-${item}`));
      document.body.classList.add(`theme-${nextTheme}`);
      const select = document.getElementById('theme-select');
      if (select && select.value !== nextTheme) select.value = nextTheme;
      updateBackgroundMusic();
      return nextTheme;
    }

    function getCurrentTheme() {
      return AVAILABLE_THEMES.find(theme => document.body.classList.contains(`theme-${theme}`)) || 'cosmic';
    }

    function getMusicKindForScreen(screen = document.body.dataset.activeScreen || 'home') {
      return GAMEPLAY_MUSIC_SCREENS.includes(screen) ? 'gameplay' : 'gameroom';
    }

    function isGameroomMusicEnabled() {
      const toggle = document.getElementById('toggle-gameroom-music');
      return toggle ? toggle.checked : true;
    }

    function isGameplayMusicEnabled() {
      const toggle = document.getElementById('toggle-gameplay-music');
      return toggle ? toggle.checked : true;
    }

    function isMusicKindEnabled(kind) {
      return kind === 'gameplay' ? isGameplayMusicEnabled() : isGameroomMusicEnabled();
    }

    function getMusicSourceForCurrentTheme(kind) {
      const theme = getCurrentTheme();
      if (!THEMES_WITH_MUSIC.includes(theme)) return '';
      const prefix = THEME_MUSIC_PREFIX[theme];
      return prefix ? `${MUSIC_ASSET_BASE}/${prefix}_${kind}.mp3` : '';
    }

    function ensureBackgroundMusicAudio() {
      if (musicState.audio) return musicState.audio;
      const audio = new Audio();
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.36;
      audio.addEventListener('ended', () => {
        if (!musicState.currentSrc || !musicState.unlocked || !isMusicKindEnabled(musicState.currentKind)) return;
        audio.currentTime = 0;
        audio.play().catch(() => { });
      });
      audio.addEventListener('error', () => {
        musicState.currentSrc = '';
        musicState.currentKind = '';
      });
      musicState.audio = audio;
      return audio;
    }

    function pauseBackgroundMusic({ clearTrack = false } = {}) {
      if (!musicState.audio) return;
      musicState.audio.pause();
      if (clearTrack) {
        musicState.audio.removeAttribute('src');
        musicState.audio.load();
        musicState.currentSrc = '';
        musicState.currentKind = '';
      }
    }

    function updateBackgroundMusic(options = {}) {
      const { unlock = false } = options;
      if (unlock) musicState.unlocked = true;

      const kind = getMusicKindForScreen();
      const src = getMusicSourceForCurrentTheme(kind);
      if (!src || !isMusicKindEnabled(kind)) {
        pauseBackgroundMusic({ clearTrack: !src });
        return;
      }

      const audio = ensureBackgroundMusicAudio();
      if (musicState.currentSrc !== src) {
        audio.pause();
        audio.src = src;
        audio.currentTime = 0;
        musicState.currentSrc = src;
        musicState.currentKind = kind;
      } else {
        musicState.currentKind = kind;
      }

      if (!musicState.unlocked || !audio.paused) return;
      audio.play().catch(() => { });
    }

    function unlockBackgroundMusic() {
      updateBackgroundMusic({ unlock: true });
    }

    function handleMusicSettingChange() {
      musicState.unlocked = true;
      saveSettings();
      updateBackgroundMusic();
    }

    function collectSettings() {
      return {
        timerDur: parseInt(document.getElementById('timer-slider').value, 10) || 60,
        prepareDur: parseInt(document.getElementById('prepare-timer-slider').value, 10) || 3,
        soundEnabled: document.getElementById('toggle-sound').checked,
        navigationSoundEnabled: document.getElementById('toggle-navigation-sound').checked,
        gameroomMusicEnabled: document.getElementById('toggle-gameroom-music').checked,
        gameplayMusicEnabled: document.getElementById('toggle-gameplay-music').checked,
        correctPoints: getConfiguredCorrectPoints(),
        wrongPenaltyPoints: getConfiguredWrongPenaltyPoints(),
        shuffleEnabled: document.getElementById('toggle-shuffle').checked,
        theme: document.getElementById('theme-select').value || 'cosmic',
        language: document.getElementById('language-select').value || DEFAULT_LANGUAGE
      };
    }

    function saveSettings() {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(collectSettings()));
    }

    function detectBrowserLanguage() {
      const browserLanguages = Array.isArray(navigator?.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator?.language].filter(Boolean);
      for (const language of browserLanguages) {
        const normalized = String(language).toLowerCase().split('-')[0];
        if (SUPPORTED_LANGUAGES.includes(normalized)) return normalized;
      }
      return DEFAULT_LANGUAGE;
    }

    function initializeSettings() {
      const defaults = {
        timerDur: 60,
        prepareDur: 3,
        soundEnabled: true,
        navigationSoundEnabled: true,
        gameroomMusicEnabled: true,
        gameplayMusicEnabled: true,
        correctPoints: DEFAULT_CORRECT_POINTS,
        wrongPenaltyPoints: DEFAULT_WRONG_PENALTY_POINTS,
        shuffleEnabled: true,
        theme: 'cosmic',
        language: DEFAULT_LANGUAGE
      };

      let rawSaved = null;
      try {
        rawSaved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
      } catch (e) { }
      const shouldAutoDetectLanguage = !rawSaved || !SUPPORTED_LANGUAGES.includes(rawSaved.language);
      const resolvedLanguage = shouldAutoDetectLanguage ? detectBrowserLanguage() : rawSaved.language;
      const saved = { ...defaults, ...(rawSaved || {}), language: resolvedLanguage };

      document.getElementById('timer-slider').value = saved.timerDur;
      document.getElementById('prepare-timer-slider').value = saved.prepareDur;
      document.getElementById('toggle-sound').checked = Boolean(saved.soundEnabled);
      document.getElementById('toggle-navigation-sound').checked = Boolean(saved.navigationSoundEnabled);
      document.getElementById('toggle-gameroom-music').checked = Boolean(saved.gameroomMusicEnabled);
      document.getElementById('toggle-gameplay-music').checked = Boolean(saved.gameplayMusicEnabled);
      document.getElementById('correct-points-input').value = parsePointValue(saved.correctPoints, DEFAULT_CORRECT_POINTS);
      document.getElementById('wrong-points-input').value = parsePointValue(saved.wrongPenaltyPoints, DEFAULT_WRONG_PENALTY_POINTS);
      document.getElementById('toggle-shuffle').checked = Boolean(saved.shuffleEnabled);
      document.getElementById('theme-select').value = applyTheme(saved.theme);
      document.getElementById('language-select').value = SUPPORTED_LANGUAGES.includes(saved.language) ? saved.language : DEFAULT_LANGUAGE;
      updateTimerLabel(saved.timerDur);
      updatePrepareTimerLabel(saved.prepareDur);
      setLanguage(saved.language || DEFAULT_LANGUAGE);
      if (shouldAutoDetectLanguage) saveSettings();
    }

    // ============================================================
    // LOAD LAST PLAYERS
    // ============================================================
    function loadPlayersForMode(mode) {
      const key = mode === 'teams' ? LAST_TEAMS_KEY : LAST_FFA_KEY;
      const saved = localStorage.getItem(key);
      if (!saved) return;
      try {
        const data = JSON.parse(saved);
        if (mode === 'teams' && data.teams) {
          gameState.teams = clone(data.teams);
          if (data.teamNames) gameState.teamNames = { ...data.teamNames };
        } else if (mode === 'ffa' && data.players) {
          gameState.players = [...data.players].slice(0, 2);
        }
      } catch (e) { }
    }

    function updateTeamName(team, name) {
      gameState.teamNames[team] = name.trim() || getDefaultTeamName(team);
      updateTeamLabels();
    }

    function updateTeamLabels() {
      try {
        ['A', 'B'].forEach(team => {
          if (!gameState.teamNames[team] || isDefaultTeamName(gameState.teamNames[team], team)) {
            gameState.teamNames[team] = getDefaultTeamName(team);
          }
        });
        document.getElementById('team-label-a').innerHTML = `🔴 ${gameState.teamNames.A}`;
        document.getElementById('team-label-b').innerHTML = `🔵 ${gameState.teamNames.B}`;
        document.getElementById('team-name-a').value = gameState.teamNames.A;
        document.getElementById('team-name-b').value = gameState.teamNames.B;
      } catch (e) { }
    }

    // ============================================================
    // SETUP
    // ============================================================
    function refreshGameTypeUI() {
      const challengeToggle = document.getElementById('random-challenge-toggle');
      const challengeWrap = document.getElementById('random-challenge-wrap');
      const challengeSub = document.getElementById('random-challenge-sub');
      if (challengeToggle) challengeToggle.disabled = false;
      if (challengeToggle) challengeToggle.checked = Boolean(gameState.randomChallenge);
      if (challengeWrap) challengeWrap.classList.remove('is-disabled');
      if (challengeSub) challengeSub.textContent = t('setup.randomChallengeSub');

      const currentLabel = document.querySelector('#screen-game .current-player .cp-label');
      if (currentLabel) currentLabel.textContent = t('game.currentPlayerLabel');
      const readyEmoji = document.getElementById('game-ready-emoji');
      if (readyEmoji) readyEmoji.textContent = '🎭';
      const readyTitle = document.getElementById('game-ready-title');
      if (readyTitle) readyTitle.textContent = t('game.readyTitle');
      const readySub = document.getElementById('game-ready-sub');
      if (readySub) readySub.textContent = t('game.readySub');
    }

    function updateDiffWordCount() {
      const total = countWordsForSelectedCategories(gameState.selectedCategories);
      document.getElementById('diff-word-count').textContent = t('dynamic.diffCount', {
        count: total,
        difficulty: t('setup.categoriesLabel')
      });
    }

    function toggleRandomChallenge(enabled) {
      gameState.randomChallenge = Boolean(enabled);
    }

    function toggleCategory(category) {
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      if (gameState.selectedCategories.includes(category)) {
        gameState.selectedCategories = gameState.selectedCategories.filter(c => c !== category);
      } else {
        gameState.selectedCategories.push(category);
      }
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderCategorySelection();
    }

    function renderCategorySelection() {
      const container = document.getElementById('category-selection');
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      const premiumPacks = getPremiumPacks();
      const coreMarkup = CATEGORY_KEYS.map(category => `
        <div class="category-card ${gameState.selectedCategories.includes(category) ? 'selected' : ''}" data-category="${category}">
          ${CATEGORY_ICONS[category]} ${getCategoryLabel(category)}
        </div>
      `).join('');
      const premiumMarkup = premiumPacks.map(pack => {
        const category = getPremiumCategoryToken(pack.id);
        return `
          <div class="category-card premium-category-card ${gameState.selectedCategories.includes(category) ? 'selected' : ''}" data-category="${category}">
            ⭐ ${getPackDisplayName(pack)}
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="category-section-title">${t('setup.coreCategoriesLabel')}</div>
        ${coreMarkup}
        ${premiumPacks.length ? `<div class="category-section-title">${t('setup.premiumCategoriesLabel')}</div>${premiumMarkup}` : ''}
      `;
    }

    function selectMode(mode, options = {}) {
      const { skipLoadPlayers = false } = options;
      gameState.mode = mode;
      document.getElementById('mode-teams').classList.toggle('selected', mode === 'teams');
      document.getElementById('mode-ffa').classList.toggle('selected', mode === 'ffa');
      document.getElementById('step-teams').classList.toggle('hidden', mode !== 'teams');
      document.getElementById('step-ffa').classList.toggle('hidden', mode !== 'ffa');
      if (!skipLoadPlayers) loadPlayersForMode(mode);
      updateTeamLabels();
      renderSetupPlayers();
    }

    function getCompanionAssignmentOptions() {
      if (gameState.mode === 'teams') {
        return [
          { value: 'team:A', label: `🔴 ${gameState.teamNames.A || getDefaultTeamName('A')}` },
          { value: 'team:B', label: `🔵 ${gameState.teamNames.B || getDefaultTeamName('B')}` }
        ];
      }

      return (gameState.players || [])
        .map(player => player.name || player)
        .filter(Boolean)
        .map(name => ({ value: `player:${name}`, label: `👤 ${name}` }));
    }

    function ensureValidCompanionAssignment() {
      const options = getCompanionAssignmentOptions();
      if (!options.length) {
        multiDeviceState.assignment = '';
        return;
      }
      if (!options.some(option => option.value === multiDeviceState.assignment)) {
        multiDeviceState.assignment = options[0].value;
      }
    }

    function isCurrentPlayerUsingCompanion() {
      const player = gameState.players[gameState.currentPlayerIdx];
      if (!player) return false;
      if (gameState.mode === 'teams') return multiDeviceState.assignment === `team:${player.team}`;
      const name = player.name || player;
      return multiDeviceState.assignment === `player:${name}`;
    }

    function hasActiveCompanionDevice() {
      return multiDeviceState.role === 'host' && multiDeviceState.connections.some(conn => conn.open);
    }

    function shouldPresentJokeOnCompanion() {
      return hasActiveCompanionDevice()
        && Boolean(gameState.currentWord)
        && gameState.phase === 'playing'
        && isCurrentPlayerUsingCompanion();
    }

    function renderCompanionAssignmentControl() {
      const card = document.getElementById('companion-assignment-card');
      const select = document.getElementById('companion-assignment-select');
      if (!card || !select) return;

      const shouldShow = multiDeviceState.role === 'host';
      card.classList.toggle('hidden', !shouldShow);
      if (!shouldShow) return;

      ensureValidCompanionAssignment();
      const options = getCompanionAssignmentOptions();
      select.innerHTML = '';
      options.forEach(option => {
        const item = document.createElement('option');
        item.value = option.value;
        item.textContent = option.label;
        select.appendChild(item);
      });
      select.value = options.some(option => option.value === multiDeviceState.assignment)
        ? multiDeviceState.assignment
        : (options[0]?.value || '');
      select.disabled = !options.length;
    }

    function setCompanionAssignment(value) {
      multiDeviceState.assignment = String(value || '');
      ensureValidCompanionAssignment();
      renderCompanionAssignmentControl();
      refreshCurrentTurnCopy();
      broadcastHostGameState();
    }

    // ============================================================
    // PLAYERS
    // ============================================================
    function renderSetupPlayers() {
      renderTeamPlayers();
      renderFFAPlayers();
      renderCompanionAssignmentControl();
    }

    function renderTeamPlayers() {
      ['A', 'B'].forEach(team => {
        const cont = document.getElementById('team-' + team.toLowerCase() + '-players');
        cont.innerHTML = '';
        (gameState.teams[team] || []).forEach((player, index) => {
          const color = team === 'A' ? 'var(--team1)' : 'var(--team2)';
          const el = document.createElement('div');
          el.className = 'player-row';
          el.innerHTML = `<div class="player-avatar" style="background:${color}22;color:${color}">${player[0].toUpperCase()}</div><div class="player-name">${player}</div><button class="btn btn-ghost btn-sm" data-action="remove-team-player" data-team="${team}" data-index="${index}">✕</button>`;
          cont.appendChild(el);
        });
      });
    }

    function addTeamPlayer(team) {
      const inp = document.getElementById('inp-team-' + team.toLowerCase());
      const name = inp.value.trim();
      if (!name) return;
      const total = (gameState.teams.A || []).length + (gameState.teams.B || []).length;
      if (total >= 6) {
        showNotif(t('notifications.maxPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }
      if ((gameState.teams[team] || []).length >= 3) {
        showNotif(t('notifications.maxTeamPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }
      if (!gameState.teams[team]) gameState.teams[team] = [];
      gameState.teams[team].push(name);
      inp.value = '';
      renderTeamPlayers();
      showNotif(t('dynamic.teamAdded', { name, teamName: gameState.teamNames[team] || getDefaultTeamName(team) }));
    }

    function removeTeamPlayer(team, idx) {
      gameState.teams[team].splice(idx, 1);
      renderTeamPlayers();
    }

    function renderFFAPlayers() {
      const cont = document.getElementById('ffa-players');
      cont.innerHTML = '';
      (gameState.players || []).forEach((player, index) => {
        const name = player.name || player;
        const el = document.createElement('div');
        el.className = 'player-row';
        el.innerHTML = `<div class="player-avatar" style="background:var(--player-avatar-bg);color:var(--player-avatar-text)">${name[0].toUpperCase()}</div><div class="player-name">${name}</div><button class="btn btn-ghost btn-sm" data-action="remove-ffa-player" data-index="${index}">✕</button>`;
        cont.appendChild(el);
      });
    }

    function addFFAPlayer() {
      const inp = document.getElementById('inp-ffa');
      const name = inp.value.trim();
      if (!name) return;
      if (!gameState.players) gameState.players = [];
      if (gameState.players.length >= 2) {
        showNotif(t('notifications.maxFfaPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }
      gameState.players.push(name);
      inp.value = '';
      renderFFAPlayers();
      showNotif(t('dynamic.playerAdded', { name }));
    }

    function removeFFAPlayer(idx) {
      gameState.players.splice(idx, 1);
      renderFFAPlayers();
    }

    function normalizeQuickGameConfig(config) {
      const gameType = 'mime';
      const mode = config?.mode === 'teams' ? 'teams' : 'ffa';
      const difficulty = 'easy';
      const rounds = Math.min(5, Math.max(1, parseInt(config?.rounds, 10) || 3));
      const selectedCategories = normalizeSelectedCategories(
        Array.isArray(config?.selectedCategories) ? config.selectedCategories : []
      );
      const teams = {
        A: Array.isArray(config?.teams?.A) ? config.teams.A.map(name => String(name).trim()).filter(Boolean).slice(0, 3) : [],
        B: Array.isArray(config?.teams?.B) ? config.teams.B.map(name => String(name).trim()).filter(Boolean).slice(0, 3) : []
      };
      const players = Array.isArray(config?.players)
        ? config.players.map(name => String(name).trim()).filter(Boolean).slice(0, 2)
        : [];
      return {
        gameType,
        mode,
        difficulty,
        rounds,
        randomChallenge: normalizeRandomChallengeSetting(config?.randomChallenge),
        selectedCategories,
        teams,
        players,
        teamNames: {
          A: String(config?.teamNames?.A || getDefaultTeamName('A')).trim() || getDefaultTeamName('A'),
          B: String(config?.teamNames?.B || getDefaultTeamName('B')).trim() || getDefaultTeamName('B')
        }
      };
    }

    function buildQuickGameConfig() {
      return normalizeQuickGameConfig({
        mode: gameState.mode,
        rounds: parseInt(document.getElementById('rounds-slider').value, 10) || gameState.totalRounds || 3,
        randomChallenge: gameState.randomChallenge,
        selectedCategories: [...gameState.selectedCategories],
        teams: clone(gameState.teams),
        players: (gameState.players || []).map(player => player.name || player),
        teamNames: { ...gameState.teamNames }
      });
    }

    function saveQuickGameConfig(config = buildQuickGameConfig()) {
      localStorage.setItem(QUICK_GAME_KEY, JSON.stringify(normalizeQuickGameConfig(config)));
      renderQuickGameSummary();
    }

    function getFirstAccessQuickGameConfig() {
      return normalizeQuickGameConfig({
        mode: 'ffa',
        rounds: 3,
        randomChallenge: true,
        selectedCategories: getDefaultSelectedCategories(),
        teams: { A: [], B: [] },
        players: [1, 2].map(number => getDefaultPlayerName(number)),
        teamNames: {
          A: getDefaultTeamName('A'),
          B: getDefaultTeamName('B')
        }
      });
    }

    function loadQuickGameConfig() {
      try {
        const saved = JSON.parse(localStorage.getItem(QUICK_GAME_KEY) || 'null');
        if (saved) return normalizeQuickGameConfig(saved);
      } catch (e) { }
      return getFirstAccessQuickGameConfig();
    }

    function applyQuickGameConfig(config) {
      const normalized = normalizeQuickGameConfig(config);
      selectMode(normalized.mode, { skipLoadPlayers: true });
      gameState.teams = clone(normalized.teams);
      gameState.players = normalized.mode === 'ffa' ? [...normalized.players] : [];
      gameState.teamNames = { ...normalized.teamNames };
      gameState.randomChallenge = normalized.randomChallenge;
      gameState.selectedCategories = [...normalized.selectedCategories];
      document.getElementById('random-challenge-toggle').checked = normalized.randomChallenge;
      document.getElementById('rounds-slider').value = String(normalized.rounds);
      document.getElementById('rounds-val').textContent = String(normalized.rounds);
      gameState.gameType = 'mime';
      gameState.difficulty = 'easy';
      updateTeamLabels();
      renderSetupPlayers();
      renderCategorySelection();
      refreshGameTypeUI();
    }

    function startQuickGame() {
      applyQuickGameConfig(loadQuickGameConfig());
      startGame();
    }

    // ============================================================
    // START GAME
    // ============================================================
    function startGame() {
      const rounds = parseInt(document.getElementById('rounds-slider').value, 10);
      gameState.totalRounds = rounds;
      gameState.timerDur = parseInt(document.getElementById('timer-slider').value, 10) || 60;
      gameState.prepareDur = parseInt(document.getElementById('prepare-timer-slider').value, 10) || 3;
      gameState.gameType = 'mime';
      gameState.difficulty = 'easy';
      refreshGameTypeUI();

      if (gameState.mode === 'teams') {
        const teamA = gameState.teams.A || [];
        const teamB = gameState.teams.B || [];
        if (teamA.length < 1 || teamB.length < 1) {
          showNotif(t('notifications.minTeamPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
          return;
        }
        gameState.players = [];
        const maxLen = Math.max(teamA.length, teamB.length);
        for (let i = 0; i < maxLen; i++) {
          if (i < teamA.length) gameState.players.push({ name: teamA[i], team: 'A' });
          if (i < teamB.length) gameState.players.push({ name: teamB[i], team: 'B' });
        }
        gameState.scores = { teamA: 0, teamB: 0 };
        teamA.forEach(player => { gameState.scores[player] = 0; });
        teamB.forEach(player => { gameState.scores[player] = 0; });
      } else {
        if (!gameState.players || gameState.players.length !== 2) {
          showNotif(t('notifications.minFfaPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
          return;
        }
        const players = [...gameState.players];
        gameState.players = players.map(player => ({ name: player.name || player, team: null }));
        gameState.scores = {};
        players.forEach(player => { gameState.scores[player.name || player] = 0; });
      }

      gameState.currentPlayerIdx = 0;
      gameState.currentRound = 1;
      gameState.usedWords = [];
      gameState.turnsDone = 0;
      gameState.totalTurns = gameState.players.length * rounds;
      gameState.leaderboardRecorded = false;
      ensureValidCompanionAssignment();
      saveQuickGameConfig();

      const key = gameState.mode === 'teams' ? LAST_TEAMS_KEY : LAST_FFA_KEY;
      const toSave = gameState.mode === 'teams'
        ? { teams: gameState.teams, teamNames: gameState.teamNames }
        : { players: gameState.players.map(player => player.name || player) };
      localStorage.setItem(key, JSON.stringify(toSave));

      initTurn();
      goTo('game');
    }

    // ============================================================
    // TURN
    // ============================================================
    function renderCurrentPlayerInfo() {
      const player = gameState.players[gameState.currentPlayerIdx];
      if (!player) return;
      document.getElementById('current-player-name').textContent = player.name || player;
      const badge = document.getElementById('current-team-badge');
      if (player.team) {
        const color = player.team === 'A' ? 'var(--team1)' : 'var(--team2)';
        const label = gameState.teamNames[player.team] || getDefaultTeamName(player.team);
        badge.innerHTML = `<span class="team-badge" style="background:${color}22;color:${color}">${label}</span>`;
      } else {
        badge.innerHTML = '';
      }
    }

    function updateScoreManagerButton() {
      const button = document.getElementById('score-manager-open-btn');
      if (!button) return;
      button.classList.toggle('hidden', !(gameState.players.length && gameState.phase === 'preparing'));
    }

    function refreshCurrentTurnCopy() {
      if (gameState.players.length) {
        document.getElementById('round-display').textContent = t('dynamic.roundDisplay', {
          current: gameState.currentRound,
          total: gameState.totalRounds
        });
        renderCurrentPlayerInfo();
      }
      if (gameState.currentWord) {
        document.getElementById('word-display').textContent = gameState.currentWord.word;
      }
      syncHostJokePresentation();
      updateScoreManagerButton();
    }

    function syncHostJokePresentation() {
      const gameWord = document.getElementById('word-display');
      const gameChallengeEl = document.getElementById('game-challenge-display');
      const gameChallengeTextEl = document.getElementById('game-challenge-text');
      const onCompanion = shouldPresentJokeOnCompanion();

      if (!gameState.currentWord) {
        if (gameWord) gameWord.textContent = '---';
        gameChallengeEl?.classList.add('hidden');
        return;
      }

      const displayText = onCompanion ? t('game.wordOnCompanion') : gameState.currentWord.word;
      if (gameWord) gameWord.textContent = displayText;

      const shouldShowChallenge = Boolean(gameState.currentChallenge) && !onCompanion;
      if (shouldShowChallenge) {
        if (gameChallengeTextEl) gameChallengeTextEl.textContent = gameState.currentChallenge;
        gameChallengeEl?.classList.remove('hidden');
      } else {
        gameChallengeEl?.classList.add('hidden');
      }
    }

    function initTurn() {
      gameState.phase = 'preparing';
      gameState.currentWord = null;
      gameState.currentChallenge = null;
      gameState.memorizeLeft = gameState.prepareDur;
      gameState.timerLeft = gameState.timerDur;
      updateTimerDisplay(gameState.timerDur, gameState.timerDur);
      document.getElementById('round-display').textContent = t('dynamic.roundDisplay', {
        current: gameState.currentRound,
        total: gameState.totalRounds
      });
      renderCurrentPlayerInfo();
      document.getElementById('preparing-state').classList.remove('hidden');
      document.getElementById('memorize-state').classList.add('hidden');
      document.getElementById('playing-state').classList.add('hidden');
      syncHostJokePresentation();
      refreshGameTypeUI();
      renderScoreMini();
      updateScoreManagerButton();
      broadcastHostGameState();
    }

    // ============================================================
    // REVEAL + MEMORIZE
    // ============================================================
    function revealWord() {
      gameState.phase = 'memorizing';
      gameState.memorizeLeft = gameState.prepareDur;
      updateScoreManagerButton();
      gameState.currentWord = pickWord();
      syncHostJokePresentation();

      document.getElementById('preparing-state').classList.add('hidden');
      document.getElementById('memorize-state').classList.remove('hidden');
      document.getElementById('playing-state').classList.add('hidden');
      broadcastHostGameState();

      const mc = document.getElementById('memCircle');
      const mn = document.getElementById('mem-num');
      updateMemCircle(gameState.memorizeLeft, gameState.prepareDur, mc, mn, 213.6);
      playAlertBeep(600);
      clearInterval(gameState.memInterval);
      gameState.memInterval = setInterval(() => {
        gameState.memorizeLeft--;
        updateMemCircle(gameState.memorizeLeft, gameState.prepareDur, mc, mn, 213.6);
        if (gameState.memorizeLeft > 0) {
          broadcastHostGameState();
          playAlertBeep(gameState.memorizeLeft <= 2 ? 700 : 500);
        } else {
          clearInterval(gameState.memInterval);
          document.getElementById('memorize-state').classList.add('hidden');
          document.getElementById('playing-state').classList.remove('hidden');
          gameState.phase = 'playing';
          gameState.memorizeLeft = 0;
          updateScoreManagerButton();
          syncHostJokePresentation();
          broadcastHostGameState();
          playAlertBeep(880);
          startTimer();
        }
      }, 1000);
    }

    function updateMemCircle(left, total, circ, numEl, circumference) {
      const safeTotal = Math.max(1, Number(total) || 1);
      const safeLeft = Math.max(0, Number(left) || 0);
      numEl.textContent = safeLeft;
      circ.style.strokeDashoffset = circumference - (safeLeft / safeTotal) * circumference;
    }

    // ============================================================
    // PICK WORD / CHALLENGES
    // ============================================================
    function pickWord() {
      const shuffle = document.getElementById('toggle-shuffle').checked;
      const allWords = [];

      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      gameState.selectedCategories.forEach(category => {
        const premiumPack = getPremiumPackByToken(category);
        const jokes = premiumPack
          ? getPremiumJokesForPack(premiumPack)
          : getCoreJokesForCategory(category);
        jokes.forEach(joke => {
          const text = getJokeText(joke);
          if (text) allWords.push({ word: text, cat: category });
        });
      });

      let available = allWords.filter(item => !gameState.usedWords.includes(item.word));
      if (available.length === 0) {
        gameState.usedWords = [];
        available = allWords;
      }
      if (available.length === 0) return { word: '???', cat: 'trocadilhos' };

      const picked = shuffle
        ? available[Math.floor(Math.random() * available.length)]
        : available[0];
      gameState.usedWords.push(picked.word);

      gameState.currentChallenge = null;
      if (gameState.gameType === 'mime' && gameState.randomChallenge) {
        const challenges = getLocalizedChallenges();
        if (challenges.length) {
          gameState.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        }
      }

      return picked;
    }

    // ============================================================
    // TIMER / SOUND
    // ============================================================
    function startTimer() {
      const dur = gameState.timerDur;
      gameState.timerLeft = dur;
      updateTimerDisplay(dur, dur);
      clearInterval(gameState.timerInterval);
      gameState.timerInterval = setInterval(() => {
        gameState.timerLeft--;
        updateTimerDisplay(gameState.timerLeft, dur);
        if (gameState.timerLeft <= 10 && gameState.timerLeft > 0) {
          playAlertBeep(gameState.timerLeft <= 3 ? 880 : 440);
        }
        if (gameState.timerLeft <= 0) {
          clearInterval(gameState.timerInterval);
          markResult(false, true);
        }
      }, 1000);
    }

    function updateTimerDisplay(left, total) {
      const strokeOffset = 427.3 - (left / total) * 427.3;
      const strokeColor = left > total * 0.5
        ? getThemeVar('--timer-color-safe')
        : left > total * 0.25
          ? getThemeVar('--timer-color-warning')
          : getThemeVar('--timer-color-danger');
      document.querySelectorAll('[data-timer-num]').forEach(el => {
        el.textContent = left;
      });
      document.querySelectorAll('[data-timer-circle]').forEach(circ => {
        circ.style.strokeDashoffset = strokeOffset;
        circ.style.stroke = strokeColor;
      });
      if (multiDeviceState.role === 'host' && gameState.players.length) {
        broadcastHostGameState();
      }
    }

    function updateTimerLabel(val) {
      document.getElementById('timer-val').textContent = `${val}s`;
      gameState.timerDur = parseInt(val, 10);
    }

    function updatePrepareTimerLabel(val) {
      document.getElementById('prepare-timer-val').textContent = `${val}s`;
      gameState.prepareDur = parseInt(val, 10) || 3;
    }

    function isAlertSoundEnabled() {
      const toggle = document.getElementById('toggle-sound');
      return toggle ? toggle.checked : true;
    }

    function playBeep(freq = 440) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch (e) { }
    }

    function playAlertBeep(freq = 440) {
      if (!isAlertSoundEnabled()) return;
      playBeep(freq);
    }

    function isNavigationSoundEnabled() {
      const toggle = document.getElementById('toggle-navigation-sound');
      return toggle ? toggle.checked : true;
    }

    function playClickSound() {
      playBeep(800);
    }

    function playNavigationSound() {
      if (!isNavigationSoundEnabled()) return;
      playClickSound();
    }

    function playCorrectSound() {
      if (!isNavigationSoundEnabled()) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) { }
    }

    function playWrongSound() {
      if (!isNavigationSoundEnabled()) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.setValueAtTime(300, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch (e) { }
    }

    function animateButtonClick(button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
    }

    function animateWrongButton(button) {
      button.style.transform = 'translateX(-5px)';
      setTimeout(() => { button.style.transform = 'translateX(5px)'; }, 50);
      setTimeout(() => { button.style.transform = 'translateX(-5px)'; }, 100);
      setTimeout(() => { button.style.transform = 'translateX(5px)'; }, 150);
      setTimeout(() => { button.style.transform = ''; }, 200);
    }

    // ============================================================
    // RESULT
    // ============================================================
    function resetResultGuesserPicker() {
      const nextButton = document.getElementById('result-next-turn-btn');
      if (nextButton) nextButton.disabled = false;
    }

    function markResult(correct, timeUp = false) {
      clearInterval(gameState.timerInterval);
      clearInterval(gameState.memInterval);
      document.getElementById('memorize-state').classList.add('hidden');
      resetResultGuesserPicker();
      const player = gameState.players[gameState.currentPlayerIdx];
      const playerName = player.name || player;
      const emoji = document.getElementById('resultEmoji');
      const title = document.getElementById('resultTitle');
      const sub = document.getElementById('resultSub');
      const correctPoints = getConfiguredCorrectPoints();
      const wrongPenaltyPoints = getConfiguredWrongPenaltyPoints();

      if (correct) {
        if (gameState.mode === 'teams') {
          addScore('team' + player.team, correctPoints);
          addScore(playerName, correctPoints);
        } else {
          addScore(playerName, correctPoints);
        }

        emoji.textContent = '🎉';
        title.textContent = t('result.correctTitle');
        title.style.color = 'var(--accent3)';
        sub.textContent = gameState.mode === 'teams'
          ? t('dynamic.correctTeamPoints', { teamName: gameState.teamNames[player.team] || getDefaultTeamName(player.team), points: correctPoints })
          : t('dynamic.correctPlayerPoints', { playerName, points: correctPoints });
        launchConfetti();
      } else {
        if (wrongPenaltyPoints > 0) {
          if (gameState.mode === 'teams') {
            addScore('team' + player.team, -wrongPenaltyPoints);
            addScore(playerName, -wrongPenaltyPoints);
          } else {
            addScore(playerName, -wrongPenaltyPoints);
          }
          sub.textContent = timeUp
            ? t('dynamic.timeUpPenalty', { playerName, points: wrongPenaltyPoints })
            : t('dynamic.penaltyApplied', { playerName, points: wrongPenaltyPoints });
        } else {
          sub.textContent = timeUp ? t('dynamic.timeUpNoPoints') : t('dynamic.skippedNoPoints');
        }
        emoji.textContent = timeUp ? '⏰' : '😅';
        title.textContent = timeUp ? t('result.timeUpTitle') : t('result.wrongTitle');
        title.style.color = 'var(--accent1)';
      }

      gameState.phase = 'score';
      updateScoreManagerButton();
      renderScoreMini();
      broadcastHostGameState();
      document.getElementById('resultOverlay').classList.add('show');
    }

    function nextTurn() {
      document.getElementById('resultOverlay').classList.remove('show');
      resetResultGuesserPicker();
      gameState.turnsDone++;
      if (gameState.turnsDone >= gameState.totalTurns) {
        showFinalScore();
        return;
      }
      gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % gameState.players.length;
      if (gameState.currentPlayerIdx === 0) {
        gameState.currentRound++;
        showMidScore();
      } else {
        initTurn();
      }
    }

    // ============================================================
    // SCOREBOARDS
    // ============================================================
    function renderScoreMini() {
      const cont = document.getElementById('score-mini');
      if (!cont) return;
      cont.innerHTML = '';
      if (!gameState.players.length) return;
      if (gameState.mode === 'teams') {
        ['A', 'B'].forEach(team => {
          const color = team === 'A' ? 'var(--team1)' : 'var(--team2)';
          const el = document.createElement('div');
          el.style.cssText = `background:${color}22;border:1px solid ${color}44;border-radius:12px;padding:8px 14px;display:flex;align-items:center;gap:8px;white-space:nowrap`;
          const label = gameState.teamNames[team] || getDefaultTeamName(team);
          el.innerHTML = `<span style="font-weight:800;color:${color}">${label}</span><span style="font-family:var(--font-display);font-size:1.2rem;color:${color}">${gameState.scores['team' + team] || 0}</span>`;
          cont.appendChild(el);
        });
      } else {
        gameState.players.forEach(player => {
          const name = player.name || player;
          const el = document.createElement('div');
          el.style.cssText = 'background:var(--surface-bg);border:1px solid var(--surface-border);border-radius:12px;padding:8px 14px;display:flex;align-items:center;gap:8px;white-space:nowrap';
          el.innerHTML = `<span style="font-weight:800;font-size:0.85rem">${name}</span><span style="font-family:var(--font-display);font-size:1.2rem;color:var(--accent2)">${gameState.scores[name] || 0}</span>`;
          cont.appendChild(el);
        });
      }
    }

    function renderFullScoreboard(isFinal = false) {
      const cont = document.getElementById(isFinal ? 'final-scoreboard' : 'scoreboard-list');
      cont.innerHTML = '';
      let entries = [];
      if (gameState.mode === 'teams') {
        entries = [
          { name: `🔴 ${gameState.teamNames.A || getDefaultTeamName('A')}`, pts: gameState.scores.teamA || 0, team: 'A' },
          { name: `🔵 ${gameState.teamNames.B || getDefaultTeamName('B')}`, pts: gameState.scores.teamB || 0, team: 'B' }
        ];
      } else {
        entries = gameState.players.map(player => ({
          name: player.name || player,
          pts: gameState.scores[player.name || player] || 0
        }));
      }
      entries.sort((a, b) => b.pts - a.pts);
      const ranks = ['🥇', '🥈', '🥉'];
      entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'score-row' + (index === 0 ? ' first' : index === 1 ? ' second' : index === 2 ? ' third' : '');
        const color = entry.team === 'A' ? 'var(--team1)' : entry.team === 'B' ? 'var(--team2)' : '';
        div.innerHTML = `<div class="rank-badge">${ranks[index] || (index + 1)}</div><div class="score-name" style="flex:1;${color ? 'color:' + color : ''}">${entry.name}</div><div class="score-pts">${entry.pts} <span style="font-size:0.8rem;color:var(--text3)">${t('common.pointsShort')}</span></div>`;
        cont.appendChild(div);
      });
    }

    function getLeaderboardPlayerKey(name) {
      const normalized = String(name || '').trim().toLocaleLowerCase();
      return normalized ? `player:${normalized}` : '';
    }

    function createEmptyLeaderboardModes() {
      return LEADERBOARD_MODE_KEYS.reduce((modes, key) => {
        modes[key] = { points: 0, matches: 0 };
        return modes;
      }, {});
    }

    function normalizeLeaderboardModes(modes = {}) {
      const normalized = createEmptyLeaderboardModes();
      LEADERBOARD_MODE_KEYS.forEach(key => {
        const mode = modes[key] || {};
        normalized[key] = {
          points: Number.parseInt(mode.points, 10) || 0,
          matches: Number.parseInt(mode.matches, 10) || 0
        };
      });
      return normalized;
    }

    function normalizeLeaderboardModel(model = {}) {
      const normalized = { version: 1, matches: 0, players: {} };
      const sourcePlayers = model && typeof model === 'object' ? (model.players || {}) : {};
      Object.keys(sourcePlayers).forEach(sourceKey => {
        const player = sourcePlayers[sourceKey] || {};
        const displayName = String(player.name || sourceKey.replace(/^player:/, '')).trim();
        const playerKey = getLeaderboardPlayerKey(displayName);
        if (!playerKey) return;
        normalized.players[playerKey] = {
          name: displayName,
          totalPoints: Number.parseInt(player.totalPoints, 10) || 0,
          matches: Number.parseInt(player.matches, 10) || 0,
          modes: normalizeLeaderboardModes(player.modes)
        };
      });
      const savedMatches = Number.parseInt(model?.matches, 10);
      normalized.matches = Number.isFinite(savedMatches)
        ? savedMatches
        : Object.values(normalized.players).reduce((max, player) => Math.max(max, player.matches), 0);
      return normalized;
    }

    function loadLeaderboard() {
      try {
        return normalizeLeaderboardModel(JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '{}'));
      } catch (e) {
        return normalizeLeaderboardModel();
      }
    }

    function saveLeaderboard(model) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(normalizeLeaderboardModel(model)));
    }

    function getLeaderboardModeKey(gameType = gameState.gameType, mode = gameState.mode) {
      const typeKey = gameType === 'drawing' ? 'drawing' : 'mime';
      return `${typeKey}${mode === 'teams' ? 'Teams' : 'Ffa'}`;
    }

    function getOrCreateLeaderboardPlayer(model, name) {
      const playerKey = getLeaderboardPlayerKey(name);
      if (!playerKey) return null;
      if (!model.players[playerKey]) {
        model.players[playerKey] = {
          name: String(name || '').trim(),
          totalPoints: 0,
          matches: 0,
          modes: createEmptyLeaderboardModes()
        };
      }
      return model.players[playerKey];
    }

    function collectFinalLeaderboardEntries() {
      const entriesByName = new Map();
      const addEntry = (name, points) => {
        const playerKey = getLeaderboardPlayerKey(name);
        if (!playerKey) return;
        const entry = { name: String(name || '').trim(), points: Number.parseInt(points, 10) || 0 };
        const current = entriesByName.get(playerKey);
        if (!current || entry.points > current.points) entriesByName.set(playerKey, entry);
      };

      if (gameState.mode === 'teams') {
        gameState.players.forEach(player => {
          const team = player.team;
          if (!team) return;
          addEntry(player.name || player, gameState.scores['team' + team] || 0);
        });
      } else {
        gameState.players.forEach(player => {
          const name = player.name || player;
          addEntry(name, gameState.scores[name] || 0);
        });
      }

      return Array.from(entriesByName.values());
    }

    function recordLeaderboardFinalScore() {
      if (gameState.leaderboardRecorded) return;
      const modeKey = getLeaderboardModeKey();
      const leaderboard = loadLeaderboard();
      const entries = collectFinalLeaderboardEntries();
      if (entries.length) leaderboard.matches = (Number.parseInt(leaderboard.matches, 10) || 0) + 1;
      entries.forEach(entry => {
        const player = getOrCreateLeaderboardPlayer(leaderboard, entry.name);
        if (!player) return;
        player.totalPoints += entry.points;
        player.matches += 1;
        player.modes = normalizeLeaderboardModes(player.modes);
        player.modes[modeKey].points += entry.points;
        player.modes[modeKey].matches += 1;
      });
      saveLeaderboard(leaderboard);
      gameState.leaderboardRecorded = true;
    }

    function getLeaderboardModePlayStyle(modeKey) {
      return modeKey.endsWith('Teams') ? 'teams' : 'ffa';
    }

    function getLeaderboardScopedModeKeys(filters = leaderboardFilters) {
      return LEADERBOARD_MODE_KEYS.filter(modeKey => {
        const modeMatches = filters.mode === 'all' || getLeaderboardModePlayStyle(modeKey) === filters.mode;
        return modeMatches;
      });
    }

    function getLeaderboardScopedStats(player, filters = leaderboardFilters) {
      if (filters.mode === 'all') {
        return {
          points: Number.parseInt(player.totalPoints, 10) || 0,
          matches: Number.parseInt(player.matches, 10) || 0
        };
      }

      return getLeaderboardScopedModeKeys(filters).reduce((acc, modeKey) => {
        const mode = player.modes?.[modeKey] || {};
        acc.points += Number.parseInt(mode.points, 10) || 0;
        acc.matches += Number.parseInt(mode.matches, 10) || 0;
        return acc;
      }, { points: 0, matches: 0 });
    }

    function formatLeaderboardNumber(value) {
      const locale = LANGUAGE_HTML_MAP[currentLanguage] || LANGUAGE_HTML_MAP[DEFAULT_LANGUAGE] || currentLanguage;
      return new Intl.NumberFormat(locale).format(Number.parseInt(value, 10) || 0);
    }

    function getLeaderboardBestModeKey(player, filters = leaderboardFilters) {
      const bestMode = getLeaderboardScopedModeKeys(filters)
        .map(modeKey => ({ modeKey, points: player.modes?.[modeKey]?.points || 0, matches: player.modes?.[modeKey]?.matches || 0 }))
        .sort((a, b) => (b.points - a.points) || (b.matches - a.matches))[0];
      return bestMode && (bestMode.points > 0 || bestMode.matches > 0) ? bestMode.modeKey : null;
    }

    function getLeaderboardPlayerTitle(player, filters = leaderboardFilters) {
      const bestModeKey = getLeaderboardBestModeKey(player, filters);
      if (bestModeKey) {
        return getLeaderboardModePlayStyle(bestModeKey) === 'teams'
          ? t('setup.modeTeamsName')
          : t('setup.modeFfaName');
      }
      return t('leaderboard.playerFallbackTitle');
    }

    function compareLeaderboardPlayers() {
      return (a, b) => {
        const byName = () => a.name.localeCompare(b.name, currentLanguage, { sensitivity: 'base' });
        return (b.scoped.points - a.scoped.points) || (b.scoped.matches - a.scoped.matches) || byName();
      };
    }

    function syncLeaderboardFilterUI() {
      document.querySelectorAll('[data-leaderboard-filter]').forEach(button => {
        const selected = leaderboardFilters[button.dataset.leaderboardFilter] === button.dataset.leaderboardValue;
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
    }

    function renderLeaderboard() {
      const container = document.getElementById('leaderboard-list');
      if (!container) return;
      const leaderboard = loadLeaderboard();
      const allPlayers = Object.values(leaderboard.players)
        .map(player => {
          const normalizedPlayer = { ...player, modes: normalizeLeaderboardModes(player.modes) };
          return { ...normalizedPlayer, scoped: getLeaderboardScopedStats(normalizedPlayer) };
        });
      const isOverallScope = leaderboardFilters.mode === 'all';
      const players = allPlayers
        .filter(player => isOverallScope || player.scoped.points > 0 || player.scoped.matches > 0)
        .sort(compareLeaderboardPlayers());
      const visiblePlayers = players.slice(0, LEADERBOARD_PAGE_SIZE);
      const totalMatches = Number.parseInt(leaderboard.matches, 10) || 0;
      const summary = document.getElementById('leaderboard-summary');
      if (summary) {
        summary.textContent = t('dynamic.leaderboardSummary', { players: players.length, matches: totalMatches });
      }
      syncLeaderboardFilterUI();

      container.innerHTML = '';
      if (!players.length) {
        const empty = document.createElement('div');
        empty.className = 'leaderboard-empty';
        empty.textContent = t('leaderboard.emptyState');
        container.appendChild(empty);
        const footer = document.getElementById('leaderboard-footer');
        if (footer) footer.textContent = '';
        return;
      }

      visiblePlayers.forEach((player, index) => {
        const row = document.createElement('div');
        const podiumClass = index === 0 ? ' rank-first' : index === 1 ? ' rank-second' : index === 2 ? ' rank-third' : '';
        row.className = `leaderboard-row${index < 3 ? ' is-podium' : ''}${podiumClass}`;

        const rank = document.createElement('div');
        rank.className = 'leaderboard-rank';
        const rankNumber = document.createElement('span');
        rankNumber.textContent = String(index + 1);
        rank.appendChild(rankNumber);

        const avatarFrame = document.createElement('div');
        avatarFrame.className = 'leaderboard-avatar-frame';
        const avatar = document.createElement('img');
        avatar.className = 'leaderboard-avatar';
        avatar.src = LEADERBOARD_DEFAULT_AVATAR;
        avatar.alt = '';
        avatar.loading = 'lazy';
        avatarFrame.appendChild(avatar);

        const identity = document.createElement('div');
        identity.className = 'leaderboard-identity';
        const name = document.createElement('div');
        name.className = 'leaderboard-player-name';
        name.textContent = player.name;
        const title = document.createElement('div');
        title.className = 'leaderboard-player-title';
        title.textContent = getLeaderboardPlayerTitle(player);
        const matches = document.createElement('div');
        matches.className = 'leaderboard-player-meta';
        matches.textContent = `${formatLeaderboardNumber(player.scoped.matches)} ${t('leaderboard.matchesLabel')}`;
        identity.append(name, title, matches);

        const score = document.createElement('div');
        score.className = 'leaderboard-score';
        const scoreStar = document.createElement('span');
        scoreStar.className = 'leaderboard-score-star';
        scoreStar.textContent = '★';
        const scoreCopy = document.createElement('span');
        const points = document.createElement('span');
        points.className = 'leaderboard-score-value';
        points.textContent = formatLeaderboardNumber(player.scoped.points);
        const pointsLabel = document.createElement('span');
        pointsLabel.className = 'leaderboard-score-label';
        pointsLabel.textContent = ` ${t('leaderboard.pointsLabel')}`;
        scoreCopy.append(points, pointsLabel);
        score.append(scoreStar, scoreCopy);

        row.append(rank, avatarFrame, identity, score);
        container.appendChild(row);
      });

      const footer = document.getElementById('leaderboard-footer');
      if (footer) {
        footer.textContent = t('dynamic.leaderboardFooter', {
          shown: visiblePlayers.length,
          total: players.length
        });
      }
    }

    function resetLeaderboard() {
      if (!confirm(t('confirmations.resetLeaderboard'))) return;
      localStorage.removeItem(LEADERBOARD_KEY);
      renderLeaderboard();
      showNotif(t('notifications.leaderboardReset'));
    }

    function getScoreManagerEntries() {
      if (gameState.mode === 'teams') {
        return [
          { key: 'teamA', name: `🔴 ${gameState.teamNames.A || getDefaultTeamName('A')}`, team: 'A' },
          { key: 'teamB', name: `🔵 ${gameState.teamNames.B || getDefaultTeamName('B')}`, team: 'B' }
        ];
      }
      return gameState.players.map(player => {
        const name = player.name || player;
        return { key: name, name };
      });
    }

    function renderScoreManager() {
      const container = document.getElementById('score-manager-list');
      if (!container) return;
      container.innerHTML = '';
      const currentPlayer = gameState.players[gameState.currentPlayerIdx];
      const currentName = currentPlayer ? (currentPlayer.name || currentPlayer) : '--';
      const context = document.getElementById('score-manager-context');
      if (context) {
        context.textContent = t('dynamic.scoreManagerContext', {
          round: gameState.currentRound,
          total: gameState.totalRounds,
          playerName: currentName
        });
      }

      getScoreManagerEntries().forEach(entry => {
        const row = document.createElement('div');
        row.className = 'score-row score-row-edit';
        const color = entry.team === 'A' ? 'var(--team1)' : entry.team === 'B' ? 'var(--team2)' : '';
        const name = document.createElement('div');
        name.className = 'score-name';
        name.textContent = entry.name;
        if (color) name.style.color = color;
        const controls = document.createElement('div');
        controls.className = 'score-manager-controls';
        const decrement = document.createElement('button');
        decrement.className = 'btn btn-ghost btn-sm';
        decrement.dataset.action = 'adjust-score-manager';
        decrement.dataset.scoreKey = entry.key;
        decrement.dataset.scoreDelta = '-1';
        decrement.textContent = '−';
        const input = document.createElement('input');
        input.className = 'inp score-manager-input';
        input.type = 'number';
        input.step = '1';
        input.value = String(gameState.scores[entry.key] || 0);
        input.dataset.scoreManagerInput = entry.key;
        const increment = document.createElement('button');
        increment.className = 'btn btn-ghost btn-sm';
        increment.dataset.action = 'adjust-score-manager';
        increment.dataset.scoreKey = entry.key;
        increment.dataset.scoreDelta = '1';
        increment.textContent = '+';
        controls.append(decrement, input, increment);
        row.append(name, controls);
        container.appendChild(row);
      });
    }

    function openScoreManager() {
      if (gameState.phase !== 'preparing' || !gameState.players.length) return;
      renderScoreManager();
      goTo('score-manager');
    }

    function closeScoreManager() {
      goTo('game');
      updateScoreManagerButton();
    }

    function resetScoreManagerInputs() {
      renderScoreManager();
    }

    function adjustScoreManagerInput(scoreKey, delta) {
      const input = Array.from(document.querySelectorAll('[data-score-manager-input]'))
        .find(item => item.dataset.scoreManagerInput === scoreKey);
      if (!input) return;
      input.value = String((Number.parseInt(input.value, 10) || 0) + delta);
    }

    function saveScoreManager() {
      document.querySelectorAll('[data-score-manager-input]').forEach(input => {
        const key = input.dataset.scoreManagerInput;
        gameState.scores[key] = Number.parseInt(input.value, 10) || 0;
      });
      renderScoreMini();
      broadcastHostGameState();
      closeScoreManager();
    }

    function refreshScoreScreenCopy() {
      if (!gameState.players.length || !document.getElementById('screen-score').classList.contains('active')) return;
      const roundDone = gameState.currentRound - 1;
      const remaining = gameState.totalRounds - roundDone;
      document.getElementById('score-subtitle').textContent = t('dynamic.roundSummary', { roundDone, remaining });
      document.getElementById('next-round-info').textContent = t('dynamic.roundDisplay', {
        current: gameState.currentRound,
        total: gameState.totalRounds
      });
      renderFullScoreboard(false);
    }

    function showMidScore() {
      gameState.phase = 'score';
      broadcastHostGameState();
      goTo('score');
      renderFullScoreboard(false);
      refreshScoreScreenCopy();
    }

    function continueGame() {
      goTo('game');
      initTurn();
    }

    function getFinalWinnerData() {
      if (gameState.mode === 'teams') {
        const a = gameState.scores.teamA || 0;
        const b = gameState.scores.teamB || 0;
        if (a > b) return { winner: `🔴 ${gameState.teamNames.A || getDefaultTeamName('A')}`, tie: false };
        if (b > a) return { winner: `🔵 ${gameState.teamNames.B || getDefaultTeamName('B')}`, tie: false };
        return { winner: t('final.tie'), tie: true };
      }
      const sorted = gameState.players
        .map(player => ({ name: player.name || player, pts: gameState.scores[player.name || player] || 0 }))
        .sort((a, b) => b.pts - a.pts);
      if (!sorted.length) return { winner: '--', tie: false };
      const isTie = sorted.length > 1 && sorted[0].pts === sorted[1].pts;
      return { winner: isTie ? t('final.tie') : sorted[0].name, tie: isTie };
    }

    function refreshFinalScreenCopy() {
      if (!gameState.players.length || !document.getElementById('screen-final').classList.contains('active')) return;
      const { winner, tie } = getFinalWinnerData();
      document.getElementById('final-trophy').textContent = tie ? '🤝' : '🏆';
      document.getElementById('final-winner').textContent = winner;
      renderFullScoreboard(true);
    }

    function showFinalScore() {
      gameState.phase = 'final';
      recordLeaderboardFinalScore();
      broadcastHostGameState();
      goTo('final');
      renderFullScoreboard(true);
      refreshFinalScreenCopy();
      launchConfetti(80);
    }

    // ============================================================
    // WORD BANK
    // ============================================================
    function selectPackFile() {
      const input = document.getElementById('pack-file-input');
      if (!input) return;
      input.value = '';
      input.click();
    }

    async function installWordPackFile(file) {
      setPackInstallStatus(t('notifications.packInstallReading'));
      const envelope = await parsePackFile(file);
      const pack = await buildInstalledPackFromEnvelope(envelope);
      const existingIndex = contentModel.packs.findIndex(item => item.id === pack.id);

      if (existingIndex >= 0) {
        const existingPack = contentModel.packs[existingIndex];
        if (existingPack.id === CORE_PACK_ID) throw new Error(t('packErrors.reservedPackId'));
        const shouldReplace = confirm(t('confirmations.replacePack', { packName: getPackDisplayName(existingPack) }));
        if (!shouldReplace) {
          setPackInstallStatus(t('notifications.packInstallCancelled'));
          return null;
        }
        contentModel.packs[existingIndex] = pack;
      } else {
        contentModel.packs.push(pack);
      }

      saveContentModel();
      wbPreviewPackId = pack.id;
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderInstalledPacks();
      renderWordBank();
      renderPackPreview();
      renderCategorySelection();
      updateDiffWordCount();
      setPackInstallStatus(t('notifications.packInstallSuccess'), 'success');
      showNotif(t('dynamic.packInstalled', { name: getPackDisplayName(pack) }));
      return pack;
    }

    async function handlePackFileSelection(file) {
      try {
        await installWordPackFile(file);
      } catch (error) {
        const message = error?.message || t('packErrors.invalidJson');
        setPackInstallStatus(message, 'error');
        showNotif(message, 'var(--accent2)', 'var(--text)');
      }
    }

    function toggleInstalledPack(packId) {
      const pack = contentModel.packs.find(item => item.id === packId && item.source === 'downloaded');
      if (!pack) return;
      pack.enabled = pack.enabled === false;
      saveContentModel();
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderInstalledPacks();
      renderWordBank();
      renderPackPreview();
      renderCategorySelection();
      updateDiffWordCount();
      showNotif(t('notifications.packToggled'));
    }

    function removeInstalledPack(packId) {
      const pack = contentModel.packs.find(item => item.id === packId && item.source === 'downloaded');
      if (!pack) return;
      if (!confirm(t('confirmations.removePack', { packName: getPackDisplayName(pack) }))) return;
      contentModel.packs = contentModel.packs.filter(item => item.id !== packId);
      if (wbPreviewPackId === packId) wbPreviewPackId = '';
      saveContentModel();
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderInstalledPacks();
      renderWordBank();
      renderPackPreview();
      renderCategorySelection();
      updateDiffWordCount();
      showNotif(t('notifications.packRemoved'));
    }

    function syncWBCatUI() {
      CATEGORY_KEYS.forEach(category =>
        document.getElementById('tab-' + category)?.classList.toggle('active', category === wbCat)
      );
    }

    function switchWordTab(tab) {
      wbCat = tab;
      const categorySelect = document.getElementById('inp-word-cat');
      if (categorySelect) categorySelect.value = tab;
      syncWBCatUI();
      renderWordBank();
    }

    function getWordEntriesForWordBank(locale = currentLanguage, category = wbCat) {
      const entries = [];
      const pack = getCorePack();
      const localizedBank = normalizeJokeBank(pack.jokes?.[locale] || {});
      (localizedBank[category] || []).forEach((joke, index) => {
        const word = getJokeText(joke);
        if (!word) return;
        entries.push({
          packId: pack.id,
          word,
          index,
          category,
          editable: pack.editable !== false
        });
      });
      return entries;
    }

    function renderWordBank() {
      const cont = document.getElementById('words-list');
      const summary = document.getElementById('wordbank-category-summary');
      const categorySelect = document.getElementById('inp-word-cat');
      if (categorySelect) categorySelect.value = wbCat;
      cont.innerHTML = '';
      const entries = getWordEntriesForWordBank(currentLanguage, wbCat);
      if (summary) {
        summary.textContent = `${getCategoryLabel(wbCat, { withIcon: true })} · ${t('dynamic.packWordsSummary', { count: entries.length })}`;
      }
      entries.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'joke-entry-card';

        const text = document.createElement('div');
        text.className = 'joke-entry-text';
        text.textContent = entry.word;

        card.append(text);
        if (entry.editable) {
          const removeButton = document.createElement('button');
          removeButton.className = 'btn btn-ghost btn-sm joke-entry-remove';
          removeButton.dataset.action = 'remove-word';
          removeButton.dataset.wordCategory = entry.category;
          removeButton.dataset.wordPack = entry.packId;
          removeButton.dataset.index = String(entry.index);
          removeButton.textContent = '✕';
          card.appendChild(removeButton);
        }
        cont.appendChild(card);
      });
      document.getElementById('word-count').textContent = entries.length;
    }

    function getCoreChallengeList(locale = currentLanguage) {
      const pack = getCorePack();
      ensurePackLocale(pack, locale);
      const list = normalizeChallenges(pack.readingChallenges?.[locale] || []);
      return list.length || pack.challengeOverrides?.[locale] ? list : getDefaultCoreChallenges(locale);
    }

    function setCoreChallengeList(list, locale = currentLanguage) {
      const pack = getCorePack();
      ensurePackLocale(pack, locale);
      pack.readingChallenges[locale] = ensureUniqueWords(normalizeChallenges(list));
      pack.challengeOverrides = pack.challengeOverrides || {};
      pack.challengeOverrides[locale] = true;
      syncPackLocaleCompatibility(pack, locale);
      saveContentModel();
    }

    function renderChallengeBank() {
      const cont = document.getElementById('challenges-list');
      const countEl = document.getElementById('challenge-count');
      if (!cont || !countEl) return;
      const challenges = getCoreChallengeList();
      cont.innerHTML = '';
      challenges.forEach((challenge, index) => {
        const tag = document.createElement('span');
        tag.className = 'word-tag';
        const text = document.createTextNode(`🎯 ${challenge} `);
        const removeBtn = document.createElement('span');
        removeBtn.className = 'del-btn';
        removeBtn.dataset.action = 'remove-challenge';
        removeBtn.dataset.index = String(index);
        removeBtn.textContent = '✕';
        tag.append(text, removeBtn);
        cont.appendChild(tag);
      });
      countEl.textContent = challenges.length;
    }

    function addWord() {
      const inp = document.getElementById('inp-new-word');
      const category = document.getElementById('inp-word-cat').value;
      const word = inp.value.trim();
      if (!word) return;
      const currentBank = normalizeJokeBank(getCorePack().jokes?.[currentLanguage] || {});
      const alreadyExists = (currentBank[category] || []).some(joke => getJokeText(joke) === word);
      if (alreadyExists) {
        showNotif(t('notifications.duplicateWord'), 'var(--accent2)', 'var(--text)');
        return;
      }

      const editablePack = getEditablePack();
      ensurePackLocale(editablePack, currentLanguage);
      editablePack.jokes[currentLanguage][category].push({
        id: buildJokeIdFromText(word),
        text: word
      });
      editablePack.jokes[currentLanguage][category] = normalizeJokeList(editablePack.jokes[currentLanguage][category]);
      syncPackLocaleCompatibility(editablePack, currentLanguage);
      saveContentModel();
      inp.value = '';
      renderWordBank();
      updateDiffWordCount();
      const categoryLabel = getCategoryLabel(category, { singular: true, withIcon: true });
      showNotif(t('dynamic.wordAdded', { word, category: categoryLabel, difficulty: categoryLabel }));
    }

    function addChallenge() {
      const inp = document.getElementById('inp-new-challenge');
      const challenge = inp.value.trim();
      if (!challenge) return;
      const challenges = getCoreChallengeList();
      if (challenges.includes(challenge)) {
        showNotif(t('notifications.duplicateChallenge'), 'var(--accent2)', 'var(--text)');
        return;
      }

      setCoreChallengeList([...challenges, challenge]);
      inp.value = '';
      renderChallengeBank();
      showNotif(t('dynamic.challengeAdded', { challenge }));
    }

    function removeWord(category, diff, packId, idx) {
      const pack = contentModel.packs.find(item => item.id === packId);
      if (!pack || pack.editable === false) return;
      ensurePackLocale(pack, currentLanguage);
      pack.jokes[currentLanguage][category].splice(idx, 1);
      syncPackLocaleCompatibility(pack, currentLanguage);
      saveContentModel();
      renderWordBank();
      updateDiffWordCount();
    }

    function removeChallenge(idx) {
      const challenges = getCoreChallengeList();
      if (idx < 0 || idx >= challenges.length) return;
      challenges.splice(idx, 1);
      setCoreChallengeList(challenges);
      renderChallengeBank();
      showNotif(t('notifications.challengeRemoved'));
    }

    function resetChallenges() {
      if (confirm(t('confirmations.resetChallenges'))) {
        const pack = getCorePack();
        ensurePackLocale(pack, currentLanguage);
        pack.readingChallenges[currentLanguage] = getDefaultCoreChallenges();
        pack.challengeOverrides = pack.challengeOverrides || {};
        delete pack.challengeOverrides[currentLanguage];
        syncPackLocaleCompatibility(pack, currentLanguage);
        saveContentModel();
        renderChallengeBank();
        showNotif(t('notifications.challengesRestored'));
      }
    }

    function resetWords() {
      if (confirm(t('confirmations.resetWords'))) {
        const defaultCore = normalizePack(createCorePack());
        const extraPacks = contentModel.packs.filter(pack => pack.id !== CORE_PACK_ID && pack.source !== 'builtin');
        contentModel = {
          version: 1,
          packs: [defaultCore, ...extraPacks.map(normalizePack)]
        };
        saveContentModel();
        renderWordBank();
        renderChallengeBank();
        updateDiffWordCount();
        showNotif(t('notifications.bankRestored'));
      }
    }

    function clearAppStorage(storage) {
      if (!storage) return;
      const keys = [];
      for (let i = 0; i < storage.length; i += 1) {
        const key = storage.key(i);
        if (key?.startsWith(APP_STORAGE_PREFIX)) keys.push(key);
      }
      keys.forEach(key => storage.removeItem(key));
    }

    function resetAppDefaults() {
      if (!confirm(t('confirmations.resetAppDefaults'))) return;
      clearAppStorage(localStorage);
      clearAppStorage(sessionStorage);
      window.location.reload();
    }

    // ============================================================
    // CONFETTI
    // ============================================================
    function launchConfetti(count = 40) {
      const colors = [
        getThemeVar('--accent1'),
        getThemeVar('--accent2'),
        getThemeVar('--accent3'),
        getThemeVar('--accent4'),
        getThemeVar('--accent5'),
        getThemeVar('--timer-color-warning')
      ];
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.cssText = `left:${Math.random() * 100}vw;top:-10px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};--dur:${(Math.random() * 1.5 + 1.5).toFixed(1)}s;--del2:${(Math.random() * 1).toFixed(2)}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }
    }

    // ============================================================
    // RESTART
    // ============================================================
    function confirmRestart() {
      if (confirm(t('confirmations.restartGame'))) {
        clearInterval(gameState.timerInterval);
        clearInterval(gameState.memInterval);
        document.getElementById('resultOverlay').classList.remove('show');
        resetResultGuesserPicker();
        gameState = {
          gameType: 'mime',
          mode: 'teams',
          difficulty: 'easy',
          teams: { A: [], B: [] },
          players: [],
          teamNames: { A: getDefaultTeamName('A'), B: getDefaultTeamName('B') },
          scores: {},
          currentPlayerIdx: 0,
          currentRound: 1,
          totalRounds: 3,
          currentWord: null,
          currentChallenge: null,
          usedWords: [],
          timerDur: parseInt(document.getElementById('timer-slider').value, 10) || 60,
          prepareDur: parseInt(document.getElementById('prepare-timer-slider').value, 10) || 3,
          timerInterval: null,
          memInterval: null,
          memorizeLeft: parseInt(document.getElementById('prepare-timer-slider').value, 10) || 3,
          timerLeft: 60,
          phase: 'preparing',
          totalTurns: 0,
          turnsDone: 0,
          leaderboardRecorded: false,
          randomChallenge: true,
          selectedCategories: getDefaultSelectedCategories()
        };
        selectMode('teams');
        goTo('setup');
        renderSetupPlayers();
      }
    }

    function handleNavigation(button) {
      animateButtonClick(button);
      playNavigationSound();
      goTo(button.dataset.nav);
    }

    function handleEnterSubmit(key) {
      if (key === 'team-A') addTeamPlayer('A');
      if (key === 'team-B') addTeamPlayer('B');
      if (key === 'ffa') addFFAPlayer();
      if (key === 'add-word') addWord();
      if (key === 'add-challenge') addChallenge();
    }

    function shouldPlayNavigationSoundForAction(action) {
      return action !== 'mark-correct' && action !== 'mark-wrong';
    }

    function handleAction(button) {
      const { action, team, index, wordCategory, wordDiff, wordPack, platform, packId, scoreKey, scoreDelta } = button.dataset;

      if (shouldPlayNavigationSoundForAction(action)) {
        playNavigationSound();
      }

      if (action === 'next-turn') return nextTurn();
      if (action === 'share-platform') {
        animateButtonClick(button);
        return shareToPlatform(platform);
      }
      if (action === 'quick-game') {
        animateButtonClick(button);
        return startQuickGame();
      }
      if (action === 'toggle-fullscreen') {
        animateButtonClick(button);
        return toggleFullscreen();
      }
      if (action === 'install-pwa') {
        animateButtonClick(button);
        return installPWA();
      }
      if (action === 'select-multidevice-host') {
        animateButtonClick(button);
        return selectMultiDeviceMode('host');
      }
      if (action === 'select-multidevice-join') {
        animateButtonClick(button);
        return selectMultiDeviceMode('join');
      }
      if (action === 'reset-multidevice-choice') {
        animateButtonClick(button);
        return resetMultiDeviceChoice();
      }
      if (action === 'create-multidevice-host') {
        animateButtonClick(button);
        return createMultiDeviceHost();
      }
      if (action === 'join-multidevice-session') {
        animateButtonClick(button);
        return connectToMultiDeviceHost(document.getElementById('multidevice-join-code')?.value || '');
      }
      if (action === 'continue-multidevice-setup') {
        animateButtonClick(button);
        return goTo('setup');
      }
      if (action === 'copy-multidevice-link') {
        animateButtonClick(button);
        return copyMultiDeviceLink();
      }
      if (action === 'disconnect-multidevice-guest') {
        animateButtonClick(button);
        return disconnectGuestSession();
      }
      if (action === 'reconnect-multidevice-guest') {
        animateButtonClick(button);
        return connectToMultiDeviceHost(multiDeviceState.hostPeerId || document.getElementById('multidevice-join-code')?.value || '', { isAutoReconnect: true });
      }
      if (action === 'donate-bmc') {
        animateButtonClick(button);
        return openDonationLink('buyMeCoffee');
      }
      if (action === 'donate-kofi') {
        animateButtonClick(button);
        return openDonationLink('koFi');
      }
      if (action === 'add-team-player') return addTeamPlayer(team);
      if (action === 'add-ffa-player') return addFFAPlayer();
      if (action === 'start-game') {
        animateButtonClick(button);
        return startGame();
      }
      if (action === 'confirm-restart') return confirmRestart();
      if (action === 'reset-leaderboard') return resetLeaderboard();
      if (action === 'open-score-manager') {
        animateButtonClick(button);
        return openScoreManager();
      }
      if (action === 'close-score-manager') return closeScoreManager();
      if (action === 'reset-score-manager-inputs') return resetScoreManagerInputs();
      if (action === 'adjust-score-manager') return adjustScoreManagerInput(scoreKey, Number(scoreDelta) || 0);
      if (action === 'save-score-manager') return saveScoreManager();
      if (action === 'reveal-word') return revealWord();
      if (action === 'mark-correct') {
        animateButtonClick(button);
        playCorrectSound();
        return markResult(true);
      }
      if (action === 'mark-wrong') {
        animateWrongButton(button);
        playWrongSound();
        return markResult(false);
      }
      if (action === 'continue-game') return continueGame();
      if (action === 'add-word') return addWord();
      if (action === 'add-challenge') return addChallenge();
      if (action === 'reset-words') return resetWords();
      if (action === 'reset-challenges') return resetChallenges();
      if (action === 'reset-app-defaults') return resetAppDefaults();
      if (action === 'select-pack-file') return selectPackFile();
      if (action === 'toggle-installed-pack') return toggleInstalledPack(packId);
      if (action === 'remove-installed-pack') return removeInstalledPack(packId);
      if (action === 'copy-user-id') return copyUserId();
      if (action === 'export-user-id') return exportUserId();
      if (action === 'select-user-id-file') return selectUserIdFile();
      if (action === 'remove-word') return removeWord(wordCategory, wordDiff, wordPack, Number(index));
      if (action === 'remove-challenge') return removeChallenge(Number(index));
      if (action === 'remove-team-player') return removeTeamPlayer(team, Number(index));
      if (action === 'remove-ffa-player') return removeFFAPlayer(Number(index));
    }

    function registerEventListeners() {
      document.addEventListener('click', event => {
        unlockBackgroundMusic();

        const navButton = event.target.closest('[data-nav]');
        if (navButton) {
          handleNavigation(navButton);
          return;
        }

        const modeCard = event.target.closest('[data-mode]');
        if (modeCard) {
          selectMode(modeCard.dataset.mode);
          return;
        }

        const categoryCard = event.target.closest('.category-card[data-category]');
        if (categoryCard) {
          toggleCategory(categoryCard.dataset.category);
          return;
        }

        const wbTabButton = event.target.closest('[data-wb-tab]');
        if (wbTabButton) {
          playNavigationSound();
          switchWordTab(wbTabButton.dataset.wbTab);
          return;
        }

        const packPreviewRow = event.target.closest('[data-pack-preview-id]');
        if (packPreviewRow && !event.target.closest('[data-action]')) {
          playNavigationSound();
          selectPreviewPack(packPreviewRow.dataset.packPreviewId);
          return;
        }

        const leaderboardFilter = event.target.closest('[data-leaderboard-filter]');
        if (leaderboardFilter) {
          const filter = leaderboardFilter.dataset.leaderboardFilter;
          const value = leaderboardFilter.dataset.leaderboardValue;
          if (filter === 'type' || filter === 'mode') {
            leaderboardFilters = { ...leaderboardFilters, [filter]: value };
            playNavigationSound();
            renderLeaderboard();
          }
          return;
        }

        const actionButton = event.target.closest('[data-action]');
        if (actionButton) {
          handleAction(actionButton);
        }
      });

      document.querySelectorAll('[data-team-name]').forEach(input => {
        input.addEventListener('change', () => updateTeamName(input.dataset.teamName, input.value));
      });

      document.querySelectorAll('[data-enter-submit]').forEach(input => {
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter') handleEnterSubmit(input.dataset.enterSubmit);
        });
      });

      document.getElementById('multidevice-join-code')?.addEventListener('keydown', event => {
        if (event.key === 'Enter') connectToMultiDeviceHost(event.target.value);
      });

      document.getElementById('rounds-slider').addEventListener('input', event => {
        document.getElementById('rounds-val').textContent = event.target.value;
      });

      document.getElementById('timer-slider').addEventListener('input', event => {
        updateTimerLabel(event.target.value);
        saveSettings();
      });

      document.getElementById('prepare-timer-slider').addEventListener('input', event => {
        updatePrepareTimerLabel(event.target.value);
        saveSettings();
      });

      ['correct-points-input', 'wrong-points-input'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', event => {
          const fallback = id === 'correct-points-input'
            ? DEFAULT_CORRECT_POINTS
            : DEFAULT_WRONG_PENALTY_POINTS;
          event.target.value = parsePointValue(event.target.value, fallback);
          saveSettings();
        });
      });

      document.getElementById('random-challenge-toggle').addEventListener('change', event => {
        toggleRandomChallenge(event.target.checked);
      });

      document.getElementById('companion-assignment-select')?.addEventListener('change', event => {
        setCompanionAssignment(event.target.value);
      });

      document.getElementById('toggle-sound').addEventListener('change', saveSettings);
      document.getElementById('toggle-navigation-sound').addEventListener('change', saveSettings);
      document.getElementById('toggle-gameroom-music').addEventListener('change', handleMusicSettingChange);
      document.getElementById('toggle-gameplay-music').addEventListener('change', handleMusicSettingChange);
      document.getElementById('toggle-shuffle').addEventListener('change', saveSettings);
      document.getElementById('language-select').addEventListener('change', event => {
        setLanguage(event.target.value, { save: true });
      });
      document.getElementById('theme-select').addEventListener('change', event => {
        applyTheme(event.target.value);
        saveSettings();
      });
      document.addEventListener('fullscreenchange', updateFullscreenButton);
      document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
      document.addEventListener('visibilitychange', () => {
        syncWakeLock('visibilitychange');
        if (!document.hidden) refreshMultiDevicePresence('visibilitychange');
      });
      window.addEventListener('pageshow', () => {
        syncWakeLock('pageshow');
        refreshMultiDevicePresence('pageshow');
      });
      window.addEventListener('online', () => {
        syncWakeLock('online');
        refreshMultiDevicePresence('online');
      });
      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredPWAInstallPrompt = event;
        updatePWAInstallButton();
      });
      window.addEventListener('appinstalled', () => {
        deferredPWAInstallPrompt = null;
        updatePWAInstallButton();
      });

      const packFileInput = document.getElementById('pack-file-input');
      if (packFileInput) {
        packFileInput.addEventListener('change', event => {
          const file = event.target.files?.[0];
          handlePackFileSelection(file);
          event.target.value = '';
        });
      }

      const userIdFileInput = document.getElementById('user-id-file-input');
      if (userIdFileInput) {
        userIdFileInput.addEventListener('change', event => {
          const file = event.target.files?.[0];
          handleUserIdFileSelection(file);
          event.target.value = '';
        });
      }

    }

    // ============================================================
    // INIT
    // ============================================================
    initializeSettings();
    registerEventListeners();
    selectMode('teams');
    initializeMultiDeviceJoinFromUrl();
