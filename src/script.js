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
    const SUPPORTED_LANGUAGES = ['pt', 'en', 'es', 'fr', 'de', 'it'];
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
          trocadilhos: { plural: 'Juegos de palabras', singular: 'Juego de palabras', tab: '🤹 Juegos de palabras', option: '🤹 Juegos de palabras' },
          tiozao: { plural: 'Chistes de papá', singular: 'Chiste de papá', tab: '🧢 Chistes de papá', option: '🧢 Chistes de papá' },
          cotidiano: { plural: 'Vida cotidiana', singular: 'Vida cotidiana', tab: '🏠 Vida cotidiana', option: '🏠 Vida cotidiana' },
          familia: { plural: 'Familia y relaciones', singular: 'Familia y relaciones', tab: '💬 Familia', option: '💬 Familia' },
          escola_trabalho: { plural: 'Escuela y trabajo', singular: 'Escuela y trabajo', tab: '📚 Escuela y trabajo', option: '📚 Escuela y trabajo' },
          absurdo: { plural: 'Humor absurdo', singular: 'Humor absurdo', tab: '🤪 Absurdo', option: '🤪 Absurdo' }
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
        trocadilhos: { plural: 'Jeux de mots', singular: 'Jeu de mots', tab: '🤹 Jeux de mots', option: '🤹 Jeux de mots' },
        tiozao: { plural: 'Blagues de papa', singular: 'Blague de papa', tab: '🧢 Blagues de papa', option: '🧢 Blagues de papa' },
        cotidiano: { plural: 'Vie quotidienne', singular: 'Vie quotidienne', tab: '🏠 Vie quotidienne', option: '🏠 Vie quotidienne' },
        familia: { plural: 'Famille et relations', singular: 'Famille et relations', tab: '💬 Famille', option: '💬 Famille' },
        escola_trabalho: { plural: 'École et travail', singular: 'École et travail', tab: '📚 École et travail', option: '📚 École et travail' },
        absurdo: { plural: 'Humour absurde', singular: 'Humour absurde', tab: '🤪 Absurde', option: '🤪 Absurde' }
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
        trocadilhos: { plural: 'Wortspiele', singular: 'Wortspiel', tab: '🤹 Wortspiele', option: '🤹 Wortspiele' },
        tiozao: { plural: 'Papa-Witze', singular: 'Papa-Witz', tab: '🧢 Papa-Witze', option: '🧢 Papa-Witze' },
        cotidiano: { plural: 'Alltag', singular: 'Alltag', tab: '🏠 Alltag', option: '🏠 Alltag' },
        familia: { plural: 'Familie und Beziehungen', singular: 'Familie und Beziehungen', tab: '💬 Familie', option: '💬 Familie' },
        escola_trabalho: { plural: 'Schule und Arbeit', singular: 'Schule und Arbeit', tab: '📚 Schule und Arbeit', option: '📚 Schule und Arbeit' },
        absurdo: { plural: 'Absurder Humor', singular: 'Absurder Humor', tab: '🤪 Absurder Humor', option: '🤪 Absurder Humor' }
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
        trocadilhos: { plural: 'Giochi di parole', singular: 'Gioco di parole', tab: '🤹 Giochi di parole', option: '🤹 Giochi di parole' },
        tiozao: { plural: 'Barzellette da papà', singular: 'Barzelletta da papà', tab: '🧢 Barzellette da papà', option: '🧢 Barzellette da papà' },
        cotidiano: { plural: 'Vita quotidiana', singular: 'Vita quotidiana', tab: '🏠 Vita quotidiana', option: '🏠 Vita quotidiana' },
        familia: { plural: 'Famiglia e relazioni', singular: 'Famiglia e relazioni', tab: '💬 Famiglia', option: '💬 Famiglia' },
        escola_trabalho: { plural: 'Scuola e lavoro', singular: 'Scuola e lavoro', tab: '📚 Scuola e lavoro', option: '📚 Scuola e lavoro' },
        absurdo: { plural: 'Umorismo assurdo', singular: 'Umorismo assurdo', tab: '🤪 Assurdo', option: '🤪 Assurdo' }
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

    const DEFAULT_JOKES_EN = {
  trocadilhos: [
    'Why did the scarecrow win an award? Because he was outstanding in his field.',
    'What do you call a bear with no teeth? A gummy bear.',
    'Why don’t scientists trust atoms? Because they make up everything.',
    'What do you call a fish with no eyes? A fsh.',
    'How does a penguin build its house? Igloos it together.',
    'Why did the golfer bring two pairs of pants? In case he got a hole in one.',
    'What do you call a magic dog? A Labracadabrador.',
    'Why did the bicycle fall over? Because it was two-tired.',
    'What do you call cheese that isn\'t yours? Nacho cheese.',
    'Why was the math book sad? Because it had too many problems.',
    'What do you call a fake noodle? An impasta.',
    'How do you organize a space party? You planet.',
    'What did the ocean say to the shore? Nothing, it just waved.',
    'Why are skeletons so calm? Because nothing gets under their skin.',
    'What do you call a pig that does karate? A pork chop.',
    'Why couldn\'t the leopard play hide and seek? Because he was always spotted.',
    'What do you call a belt made of watches? A waist of time.',
    'Why did the picture go to jail? Because it was framed.',
    'What do you call a deer with no eyes? No eye deer.',
    'Why did the stadium get hot? Because the fans left.',
    'What do you call a pony with a cough? A little horse.',
    'Why did the computer go to the doctor? Because it had a virus.',
    'What do you call a pile of kittens? A meowntain.',
    'How does a tree get on the internet? It logs on.',
    'Why was the broom late? It swept in.',
    'What do you call a can opener that doesn\'t work? A can\'t opener.',
    'Why are elevator jokes so good? They work on many levels.',
    'What do you call a dinosaur that is sleeping? A dino-snore.',
    'Why don\'t seagulls fly over the bay? Because then they\'d be bagels.',
    'What do you call a fake stone in an Irish quarry? A sham-rock.',
    'Why did the cookie go to the nurse? Because he felt crummy.',
    'What do you call a bear in the rain? A drizzly bear.',
    'Why did the banana go to the doctor? Because it wasn\'t peeling well.',
    'What do you call a cow with no legs? Ground beef.',
    'Why don\'t some couples go to the gym? Because some relationships don\'t work out.',
    'What do you call a dog that can tell time? A watch dog.',
    'Why did the man put his money in the freezer? He wanted cold hard cash.',
    'What do you call a line of men waiting for a haircut? A barber-que.',
    'Why are fish so smart? Because they live in schools.',
    'What do you call a musical insect? A hum-bug.',
    'Why did the egg hide? Because it was a little chicken.',
    'What do you call a snowman in the summer? A puddle.',
    'Why did the candle go to school? To get a little brighter.',
    'What do you call a ghost\'s mom and dad? Trans-parents.',
    'Why did the kangaroo stop drinking coffee? Because he got too jumpy.',
    'What do you call an alligator in a vest? An investigator.',
    'Why did the tomato turn red? Because it saw the salad dressing.',
    'What do you call a sleeping dinosaur? A dino-snore.',
    'Why don\'t ants get sick? Because they have little anty-bodies.',
    'What do you call a fly without wings? A walk.',
    'Why did the leaf go to the doctor? It was feeling green.',
    'What do you call a bear with a map? A navigator.',
    'Why was the computer cold? It left its Windows open.',
    'What do you call a rabbit with fleas? Bugs Bunny.',
    'Why did the music teacher need a ladder? To reach the high notes.',
    'What do you call a cold dog? A chili dog.',
    'Why are baseball players so rich? Because they play on home plate.',
    'What do you call a sheep with no legs? A cloud.',
    'Why did the baker go to work? To make some dough.',
    'What do you call a detective who is also a baker? A pastry chef.',
    'Why did the belt get arrested? For holding up a pair of pants.',
    'What do you call a sleeping bull? A bulldozer.',
    'Why did the lamp go to school? To get brighter.',
    'What do you call a duck that gets straight A\'s? A wise-quacker.',
    'Why was the necklace so expensive? It had a lot of carat appeal.',
    'What do you call a shoe made of a banana? A slipper.',
    'Why did the mirror go to school? To reflect on things.',
    'What do you call a pile of laundry? A mountain of chores.',
    'Why did the grapes stop in the middle of the road? Because they ran out of juice.',
    'What do you call a magic owl? Hoodini.',
    'Why did the cup go to the doctor? It felt a little chipped.',
    'What do you call a cat that likes to bowl? An alley cat.',
    'Why did the firefly get bad grades? Because he wasn\'t very bright.',
    'What do you call a lizard that sings? An Elvis Parsley.',
    'Why did the clock get fired? It was always taking time off.'
  ],
  tiozao: [
    'I only know 25 letters of the alphabet. I don\'t know y.',
    'What do you call a fake noodle? An impasta.',
    'Why don\'t skeletons fight each other? They don\'t have the guts.',
    'What do you call a pony with a sore throat? A little hoarse.',
    'How do you make a tissue dance? You put a little boogie in it.',
    'Why did the scarecrow win an award? He was outstanding in his field.',
    'What kind of shoes does a ninja wear? Sneakers.',
    'Why do cows wear bells? Because their horns don\'t work.',
    'What do you call a factory that makes okay products? A satisfactory.',
    'Why did the golfer bring two pairs of pants? In case he got a hole in one.',
    'What do you call a belt made of watches? A waist of time.',
    'Why was the math book sad? It had too many problems.',
    'What do you call a sleeping dinosaur? A dino-snore.',
    'Why did the bicycle fall over? It was two-tired.',
    'What do you call an alligator in a vest? An investigator.',
    'Why don\'t scientists trust atoms? They make up everything.',
    'What do you call a fake stone in an Irish quarry? A sham-rock.',
    'Why did the picture go to jail? It was framed.',
    'What do you call cheese that isn\'t yours? Nacho cheese.',
    'Why don\'t seagulls fly over the bay? Then they\'d be bagels.',
    'What do you call a pig that knows karate? A pork chop.',
    'How does a penguin build its house? Igloos it together.',
    'What do you call a dog that can tell time? A watch dog.',
    'Why did the computer go to the doctor? It had a virus.',
    'What do you call a pile of kittens? A meowntain.',
    'Why are skeletons so calm? Nothing gets under their skin.',
    'What do you call a fish with no eyes? A fsh.',
    'Why did the man put his money in the freezer? He wanted cold hard cash.',
    'What do you call a bear in the rain? A drizzly bear.',
    'Why don\'t ants get sick? They have little anty-bodies.',
    'What do you call a can opener that doesn\'t work? A can\'t opener.',
    'Why are elevator jokes so good? They work on many levels.',
    'What do you call a bear with no teeth? A gummy bear.',
    'Why did the cookie go to the nurse? He felt crummy.',
    'What do you call a cow with no legs? Ground beef.',
    'Why don\'t some couples go to the gym? Some relationships don\'t work out.',
    'What do you call a fly without wings? A walk.',
    'Why did the leaf go to the doctor? It was feeling green.',
    'What do you call a bear with a map? A navigator.',
    'Why was the computer cold? It left its Windows open.',
    'What do you call a rabbit with fleas? Bugs Bunny.',
    'Why did the music teacher need a ladder? To reach the high notes.',
    'What do you call a cold dog? A chili dog.',
    'Why are baseball players so rich? Because they play on home plate.',
    'What do you call a sheep with no legs? A cloud.',
    'Why did the baker go to work? To make some dough.',
    'What do you call a detective who is also a baker? A pastry chef.',
    'Why did the belt get arrested? For holding up a pair of pants.',
    'What do you call a sleeping bull? A bulldozer.',
    'Why did the lamp go to school? To get brighter.',
    'What do you call a duck that gets straight A\'s? A wise-quacker.',
    'Why was the necklace so expensive? It had a lot of carat appeal.',
    'What do you call a shoe made of a banana? A slipper.',
    'Why did the mirror go to school? To reflect on things.',
    'What do you call a pile of laundry? A mountain of chores.',
    'Why did the grapes stop in the middle of the road? Because they ran out of juice.',
    'What do you call a magic owl? Hoodini.',
    'Why did the cup go to the doctor? It felt a little chipped.',
    'What do you call a cat that likes to bowl? An alley cat.',
    'Why did the firefly get bad grades? Because he wasn\'t very bright.',
    'What do you call a lizard that sings? An Elvis Parsley.',
    'Why did the clock get fired? It was always taking time off.',
    'What do you call a snowman with a six-pack? An abdominal snowman.',
    'Why don\'t mummies take vacations? They\'re afraid to unwind.',
    'What did the zero say to the eight? Nice belt.',
    'Why was the social media influencer cross-eyed? She couldn\'t see eye to eye.',
    'What do you call a man with a spade? Doug.',
    'What do you call a man without a spade? Douglas.',
    'Why did the coach go to the bank? To get his quarterback.',
    'What do you call a fake alligator? A phony-gator.',
    'Why did the skeleton go to the party alone? He had no body to go with.',
    'What do you call a bear with no teeth? A gummy bear.',
    'Why are ghosts bad liars? Because you can see right through them.',
    'What do you call a group of musical whales? An orca-stra.',
    'Why was the calendar so popular? It had many dates.'
  ],
  cotidiano: [
    'I tried to be normal once. Worst two minutes of my life.',
    'I have a lot of jokes about unemployed people, but none of them work.',
    'My bed is a magical place where I suddenly remember everything I forgot to do.',
    'I’m on a whiskey diet. I’ve lost three days already.',
    'Light travels faster than sound. That’s why some people appear bright until they speak.',
    'I want to die peacefully in my sleep like my grandfather. Not screaming in terror like his passengers.',
    'If you think nobody cares if you’re alive, try missing a couple of car payments.',
    'My wife told me to stop impersonating a flamingo. I had to put my foot down.',
    'I told my doctor that I broke my arm in two places. He told me to stop going to those places.',
    'Parallel lines have so much in common. It’s a shame they’ll never meet.',
    'I threw a boomerang a few years ago. I now live in constant fear.',
    'The early bird can have the worm, because worms are gross and mornings are stupid.',
    'I’m not lazy, I’m just on energy saving mode.',
    'My life is a series of "I have no idea what I\'m doing" moments.',
    'I finally realized that people are easier to deal with if you just don\'t.',
    'If I had a dollar for every time I was wrong, I’d be broke.',
    'I don’t suffer from insanity, I enjoy every minute of it.',
    'My keyboard must be broken, I keep hitting the escape key but I’m still at work.',
    'I’m not arguing, I’m just explaining why I’m right.',
    'Whenever I find the key to success, someone changes the lock.',
    'I pretend to work, they pretend to pay me.',
    'My spirit animal is a sloth on a coffee break.',
    'I’m not messy, I’m just creatively organized.',
    'My phone battery life is shorter than my patience.',
    'I’m not shy, I’m just holding back my awesomeness.',
    'I’m at that age where my back goes out more than I do.',
    'My life is like a DVD menu that just loops forever.',
    'I’m just a human being trying to make it to Friday.',
    'My cooking is so bad, the smoke alarm is my personal chef.',
    'I’m not a complete idiot, some parts are missing.',
    'I’m not old, I’m just vintage.',
    'My plants are dying because I keep looking at them with disappointment.',
    'I’m a multitasker: I can waste time, be unproductive, and procrastinate all at once.',
    'My bank account is a work of fiction.',
    'I’m not procrastinating, I’m just giving my ideas time to ripen.',
    'My favorite exercise is a cross between a lunge and a crunch—it’s called lunch.',
    'I’m not lost, I’m exploring.',
    'My memory is so bad I could plan my own surprise party.',
    'I’m not short, I’m fun-sized.',
    'My room is not a mess, it’s an obstacle course.',
    'I’m not lazy, I’m just highly motivated to do nothing.',
    'My social battery is at 1%.',
    'I’m not a morning person, I’m a "leave me alone" person.',
    'My life is basically just a series of technical difficulties.',
    'I’m not weird, I’m a limited edition.',
    'My car isn’t slow, it’s just taking its time.',
    'I’m not tired, I’m just resting my eyes.',
    'My brain has too many tabs open.',
    'I’m not cynical, I’m just experienced.',
    'My patience is as thin as a single-ply toilet paper.',
    'I’m not ignoring you, I’m just prioritizing my own silence.',
    'My hair is a bird’s nest of chaos.',
    'I’m not a genius, I just have a good search engine.',
    'My diet consists of caffeine and stress.',
    'I’m not clumsy, the floor hates me.',
    'My sense of humor is a cry for help.',
    'I’m not yelling, I’m just speaking with passion.',
    'My outfit is "I don’t care" chic.',
    'I’m not judging you, I’m just observing your life choices.',
    'My plans for the weekend are: sleep, repeat.',
    'I’m not a fan of people, but I’m a fan of being alone.',
    'My hobbies include overthinking and snacking.',
    'I’m not a morning person, I’m a "coffee" person.',
    'My life is a comedy of errors.',
    'I’m not dramatic, I’m just expressive.',
    'My playlist is basically my life story in songs.',
    'I’m not lost, I just don’t know where I am.',
    'My day is a 10/10 if I didn’t have to leave the house.',
    'I’m not forgetful, I’m just selective.',
    'My dog is the only one who understands me.',
    'I’m not procrastinating, I’m just waiting for the deadline.',
    'My house is a disaster area.',
    'I’m not a night owl, I’m a "can’t sleep" person.',
    'My coffee is my only friend.',
    'I’m not rude, I’m just blunt.'
  ],
  familia: [
    'My kids keep asking where they came from, so I tell them I found them on eBay.',
    'A family tree is just a diagram of people who share the same weird habits.',
    'My mom always said, "I hope you have a kid who acts just like you."',
    'Having kids is like having a tiny, drunk roommate who refuses to pay rent.',
    'My family’s definition of "leaving at 8 AM" means we’re still in the driveway at 9.',
    'My dad’s jokes are so bad, we have to pretend to laugh to keep him happy.',
    'Marriage is just texting each other "What do you want for dinner?" until one of you dies.',
    'I love how my family just assumes I have free time on the weekend.',
    'My sibling is the only person who can make me angry and laugh at the same time.',
    'My grandmother is the boss; she doesn’t argue, she just stares until you surrender.',
    'Family reunions are basically just judging everyone who looks different than you.',
    'My parents have a "no phone at the table" rule, which is ironic because they watch TV while eating.',
    'My brother is the reason I have trust issues, and also the reason I have fun.',
    'My mom treats my house like a hotel, but without the housekeeping.',
    'Every family has that one relative who shouldn’t be allowed to speak in public.',
    'My kids think money grows on trees, and I’m the one doing the watering.',
    'My sister and I are like cat and dog, until someone else tries to mess with her.',
    'My father thinks he’s a comedian, but his only audience is his own reflection.',
    'My wife said I need to listen more, or something like that.',
    'My family tree is more like a family bush.',
    'My kids have more energy than a nuclear power plant.',
    'My parents are the reason I am the way I am.',
    'My brother is the reason I’m so competitive.',
    'My family’s favorite activity is complaining about each other.',
    'My mom is the best at finding things I’ve already looked for.',
    'My dad is the king of fixing things that aren’t broken.',
    'My kids are the reason I have gray hair.',
    'My family is the perfect example of organized chaos.',
    'My wife is the boss, I just live here.',
    'My brother is the reason I have so many secrets.',
    'My sister is the best person to gossip with.',
    'My mom is the reason I have high standards.',
    'My dad is the reason I have a dry sense of humor.',
    'My kids are the reason I’m always broke.',
    'My family is the reason I’m so grounded.',
    'My sister is the reason I know how to argue.',
    'My brother is the reason I have a thick skin.',
    'My mom is the reason I’m so resilient.',
    'My dad is the reason I’m so stubborn.',
    'My kids are the reason I’m so patient.',
    'My family is the reason I’m so weird.',
    'My sister is the reason I’m so protective.',
    'My brother is the reason I’m so independent.',
    'My mom is the reason I’m so loving.',
    'My dad is the reason I’m so analytical.',
    'My kids are the reason I’m so tired.',
    'My family is the reason I’m so grateful.',
    'My sister is the reason I’m so opinionated.',
    'My brother is the reason I’m so adventurous.',
    'My mom is the reason I’m so organized.',
    'My dad is the reason I’m so handy.',
    'My kids are the reason I’m so humble.',
    'My family is the reason I’m so social.',
    'My sister is the reason I’m so creative.',
    'My brother is the reason I’m so ambitious.',
    'My mom is the reason I’m so empathetic.',
    'My dad is the reason I’m so practical.',
    'My kids are the reason I’m so fun.',
    'My family is the reason I’m so happy.',
    'My sister is the reason I’m so intelligent.',
    'My brother is the reason I’m so strong.',
    'My mom is the reason I’m so beautiful.',
    'My dad is the reason I’m so brave.',
    'My kids are the reason I’m so lucky.',
    'My family is the reason I’m so blessed.',
    'My sister is the reason I’m so talented.',
    'My brother is the reason I’m so athletic.',
    'My mom is the reason I’m so wise.',
    'My dad is the reason I’m so kind.',
    'My kids are the reason I’m so young at heart.',
    'My family is the reason I’m so complete.',
    'My sister is the reason I’m so thoughtful.',
    'My brother is the reason I’m so reliable.',
    'My mom is the reason I’m so graceful.',
    'My dad is the reason I’m so steady.'
  ],
  escola_trabalho: [
    'I love my job, but I’d love it more if I didn’t have to go there.',
    'My boss said, "Have a good day," so I went home.',
    'Why is Monday so far from Friday and Friday so close to Monday?',
    'The highlight of my day is when I can close all my browser tabs.',
    'I’m not lazy, I’m just on energy-saving mode during office hours.',
    'Working at a computer is just hitting keys until the work disappears.',
    'I’m a multitasker: I can be on a call, eating, and pretending to care all at once.',
    'My job is 10% work and 90% wondering if it’s lunch time yet.',
    'Why does the printer only jam when I’m in a hurry?',
    'The meeting could have been an email, but we all know that.',
    'I don’t mind the work, it’s the coworkers that get to me.',
    'I’m not a perfectionist, I just don’t want to do it again.',
    'I have a degree in "figuring it out as I go along."',
    'My favorite part of the workday is leaving the building.',
    'Why is "easy" always followed by "but"?',
    'I’m not late, I’m just on a flexible schedule.',
    'My computer thinks I’m working, but I’m really just staring at the wall.',
    'I don’t have an office, I have a cubicle of despair.',
    'My boss is like a cloud: when he disappears, it’s a beautiful day.',
    'I’m not stressed, I’m just "under-resourced" and "over-tasked."',
    'My job is like a rollercoaster, except the seatbelt doesn’t work.',
    'I’m not complaining, I’m just "providing constructive feedback."',
    'My office chair is the most comfortable thing in my life.',
    'I’m not ignoring my email, I’m just "curating my inbox."',
    'My job is to look busy while doing nothing.',
    'I’m not a fan of meetings, I’m a fan of "getting things done."',
    'My boss is great, as long as I don’t talk to him.',
    'I’m not a coffee addict, I’m a "caffeine enthusiast."',
    'My job is 50% typing and 50% fixing my own typos.',
    'I’m not a fan of spreadsheets, I’m a fan of "data visualization."',
    'My job is to make the impossible look easy.',
    'I’m not a fan of conference calls, I’m a fan of "mute and forget."',
    'My job is to solve problems I didn’t create.',
    'I’m not a fan of deadlines, I’m a fan of "last-minute inspiration."',
    'My job is to turn coffee into results.',
    'I’m not a fan of dress codes, I’m a fan of "comfortable professionalism."',
    'My job is to stay sane in a sea of insanity.',
    'I’m not a fan of overtime, I’m a fan of "work-life balance."',
    'My job is to be the person everyone asks questions to.',
    'I’m not a fan of teamwork, I’m a fan of "doing it my way."',
    'My job is to navigate the corporate labyrinth.',
    'I’m not a fan of performance reviews, I’m a fan of "self-reflection."',
    'My job is to keep the peace.',
    'I’m not a fan of training, I’m a fan of "learning on the job."',
    'My job is to be the expert in something I barely understand.',
    'I’m not a fan of office politics, I’m a fan of "avoidance."',
    'My job is to keep my head down and work.',
    'I’m not a fan of networking, I’m a fan of "staying in my lane."',
    'My job is to be the unsung hero.',
    'I’m not a fan of corporate jargon, I’m a fan of "plain English."',
    'My job is to keep things moving.',
    'I’m not a fan of business trips, I’m a fan of "working from home."',
    'My job is to be the calm in the storm.',
    'I’m not a fan of performance goals, I’m a fan of "doing my best."',
    'My job is to be the bridge between departments.',
    'I’m not a fan of salary negotiations, I’m a fan of "value-based compensation."',
    'My job is to be the glue that holds everything together.',
    'I’m not a fan of corporate culture, I’m a fan of "getting the job done."',
    'My job is to be the voice of reason.',
    'I’m not a fan of quarterly reports, I’m a fan of "results-oriented thinking."',
    'My job is to keep the lights on.',
    'I’m not a fan of project management software, I’m a fan of "sticky notes."',
    'My job is to be the problem solver.',
    'I’m not a fan of company retreats, I’m a fan of "peace and quiet."',
    'My job is to be the reliable one.',
    'I’m not a fan of LinkedIn, I’m a fan of "keeping my private life private."',
    'My job is to be the backbone of the team.',
    'I’m not a fan of "synergy," I’m a fan of "getting stuff done."',
    'My job is to keep my cool.',
    'I’m not a fan of "think tanks," I’m a fan of "actually thinking."',
    'My job is to be the one who knows where the stapler is.',
    'I’m not a fan of "disruptors," I’m a fan of "steady progress."',
    'My job is to be the one who finishes the task.',
    'I’m not a fan of "innovation," I’m a fan of "common sense."',
    'My job is to be the one who stays until the end.'
  ],
  absurdo: [
    'Why did the banana go to the party? Because he was a split personality.',
    'A penguin walks into a bar and asks, "Has anyone seen my brother?" The bartender says, "I don’t know, what does he look like?"',
    'What do you get when you cross a snowman and a vampire? Frostbite.',
    'Why don’t aliens visit us? Because we’re a reality show they canceled.',
    'I bought some powdered water, but I didn’t know what to add to it.',
    'What do you call a fly with no wings? A walk.',
    'Why did the picture go to jail? Because it was framed.',
    'I once saw a dog playing the piano, but he wasn’t very good at it.',
    'Why did the chicken cross the playground? To get to the other slide.',
    'What’s brown and sticky? A stick.',
    'Why did the man fall into the well? Because he couldn’t see that well.',
    'What do you call a fake noodle? An impasta.',
    'Why did the cookie go to the nurse? Because he felt crummy.',
    'What do you call a belt made of watches? A waist of time.',
    'Why did the bicycle fall over? It was two-tired.',
    'What do you call a fish with no eyes? A fsh.',
    'Why did the scarecrow win an award? He was outstanding in his field.',
    'What do you call a pile of kittens? A meowntain.',
    'Why are skeletons so calm? Nothing gets under their skin.',
    'Why did the man put his money in the freezer? He wanted cold hard cash.',
    'What do you call a bear in the rain? A drizzly bear.',
    'Why don’t ants get sick? They have little anty-bodies.',
    'What do you call a can opener that doesn’t work? A can’t opener.',
    'Why are elevator jokes so good? They work on many levels.',
    'What do you call a bear with no teeth? A gummy bear.',
    'Why did the baker go to work? To make some dough.',
    'What do you call a detective who is also a baker? A pastry chef.',
    'Why did the belt get arrested? For holding up a pair of pants.',
    'What do you call a sleeping bull? A bulldozer.',
    'Why did the lamp go to school? To get brighter.',
    'What do you call a duck that gets straight A\'s? A wise-quacker.',
    'Why was the necklace so expensive? It had a lot of carat appeal.',
    'What do you call a shoe made of a banana? A slipper.',
    'Why did the mirror go to school? To reflect on things.',
    'What do you call a pile of laundry? A mountain of chores.',
    'Why did the grapes stop in the middle of the road? Because they ran out of juice.',
    'What do you call a magic owl? Hoodini.',
    'Why did the cup go to the doctor? It felt a little chipped.',
    'What do you call a cat that likes to bowl? An alley cat.',
    'Why did the firefly get bad grades? Because he wasn’t very bright.',
    'What do you call a lizard that sings? An Elvis Parsley.',
    'Why did the clock get fired? It was always taking time off.',
    'What do you call a snowman with a six-pack? An abdominal snowman.',
    'Why don’t mummies take vacations? They’re afraid to unwind.',
    'What did the zero say to the eight? Nice belt.',
    'Why was the social media influencer cross-eyed? She couldn’t see eye to eye.',
    'What do you call a man with a spade? Doug.',
    'What do you call a man without a spade? Douglas.',
    'Why did the coach go to the bank? To get his quarterback.',
    'What do you call a fake alligator? A phony-gator.',
    'Why did the skeleton go to the party alone? He had no body to go with.',
    'Why are ghosts bad liars? Because you can see right through them.',
    'What do you call a group of musical whales? An orca-stra.',
    'Why was the calendar so popular? It had many dates.',
    'Why did the elephant paint his toenails red? To hide in a cherry tree.',
    'Have you ever seen an elephant in a cherry tree? No? See, it works!',
    'What do you call a cow that plays the guitar? A moo-sician.',
    'Why did the sun go to school? To get brighter.',
    'What do you call a pig that knows karate? A pork chop.',
    'Why did the broom get a promotion? It swept everyone away.',
    'What do you call a fish that wears a bowtie? Sofishticated.',
    'Why did the tomato turn red? Because it saw the salad dressing.',
    'What do you call a bear with no teeth? A gummy bear.',
    'Why did the golfer bring extra socks? In case he got a hole in one.',
    'What do you call a sleeping dinosaur? A dino-snore.',
    'Why did the bicycle fall over? It was two-tired.',
    'What do you call a belt made of watches? A waist of time.',
    'Why did the math book look sad? It had too many problems.',
    'What do you call a fake stone? A sham-rock.',
    'Why did the picture go to jail? Because it was framed.',
    'What do you call a pile of kittens? A meowntain.',
    'Why are skeletons so calm? Because nothing gets under their skin.',
    'Why did the computer go to the doctor? Because it had a virus.',
    'What do you call a can opener that doesn’t work? A can’t opener.',
    'Why are elevator jokes so good? They work on many levels.'
  ]
};

    const DEFAULT_JOKES_ES = {
  trocadilhos: [
    '¿Qué le dice un jaguar a otro jaguar? Jaguar you?',
    '¿Cómo se dice pañuelo en japonés? Saka-moko.',
    '¿Cómo se dice disparo en árabe? Ahí-va-bala.',
    '¿Qué le dice un techo a otro techo? Te-cho de menos.',
    '¿Cómo se dice espejo en chino? Aito-yito.',
    '¿Qué hace una abeja en el gimnasio? Zumba.',
    '¿Cómo se dice corto en chino? Chin-chu-lin.',
    '¿Qué le dice una impresora a otra? ¿Esa hoja es tuya o es impresión mía?',
    '¿Cómo se dice perro en inglés? Dog. ¿Y perrito? Dog-y.',
    '¿Qué le dice el mar a la playa? Nada.',
    '¿Cómo se dice profesor de yoga en chino? Shin-ta-lo.',
    '¿Qué le dice un cable a otro? Cable-mos.',
    '¿Cómo se dice naufragio en chino? Chin-chu-lancha.',
    '¿Qué le dice una iguana a su hermana gemela? Iguanita.',
    '¿Cómo se dice suegra en chino? Chin-chu-la.',
    '¿Qué le dice un jardinero a otro? Nos vemos cuando podamos.',
    '¿Cómo se dice indigestión en chino? Chin-chu-pan.',
    '¿Qué le dice una pared a otra? Nos vemos en la esquina.',
    '¿Cómo se dice bombero en chino? Fuego-chuchi.',
    '¿Qué le dice un semáforo a otro? No me mires que me estoy cambiando.',
    '¿Cómo se dice rico en chino? Chin-chu-plata.',
    '¿Qué le dice un libro de matemáticas a otro? Tengo muchos problemas.',
    '¿Cómo se dice pelado en chino? Shin-pelo.',
    '¿Qué le dice un espejo a otro? Me veo reflejado en ti.',
    '¿Cómo se dice escalera en chino? Chin-chu-piso.',
    '¿Qué le dice un 1 a un 10? Para ser como yo, tienes que ser sincero.',
    '¿Cómo se dice bicicleta en chino? Chin-chu-rueda.',
    '¿Qué le dice una aguja a un alfiler? Que te pinche el destino.',
    '¿Cómo se dice ascensor en chino? Chin-chu-sube.',
    '¿Qué le dice un globo a otro? Cuidado, que te pinchas.',
    '¿Cómo se dice café en chino? Chin-chu-taza.',
    '¿Qué le dice una uva verde a una morada? ¡Respira!',
    '¿Cómo se dice escoba en chino? Chin-chu-barre.',
    '¿Qué le dice el cero al ocho? ¡Qué cinturón más apretado!',
    '¿Cómo se dice paraguas en chino? Chin-chu-lluvia.',
    '¿Qué le dice una taza a otra? Taza-taza, cada uno en su casa.',
    '¿Cómo se dice refrigerador en chino? Chin-chu-frio.',
    '¿Qué le dice un calcetín a otro? Te he perdido la pista.',
    '¿Cómo se dice abanico en chino? Chin-chu-aire.',
    '¿Qué le dice un tenedor a una cuchara? Eres muy cóncava.',
    '¿Cómo se dice televisor en chino? Chin-chu-veo.',
    '¿Qué le dice un teclado a otro? Estamos muy juntos.',
    '¿Cómo se dice silla en chino? Chin-chu-sienta.',
    '¿Qué le dice un zapato a otro? Somos una pareja ideal.',
    '¿Cómo se dice almohada en chino? Chin-chu-duerme.',
    '¿Qué le dice una carta a otra? Me tienes sello.',
    '¿Cómo se dice ventana en chino? Chin-chu-mira.',
    '¿Qué le dice un lápiz a un papel? Te voy a marcar.',
    '¿Cómo se dice cama en chino? Chin-chu-descansa.',
    '¿Qué le dice un reloj a otro? Se nos acaba el tiempo.',
    '¿Cómo se dice cuchillo en chino? Chin-chu-corta.',
    '¿Qué le dice un libro a una estantería? Estoy apoyado en ti.',
    '¿Cómo se dice llave en chino? Chin-chu-abre.',
    '¿Qué le dice una lámpara a otra? Me das mucha luz.',
    '¿Cómo se dice cortina en chino? Chin-chu-tapa.',
    '¿Qué le dice un peine a otro? Te has despeinado.',
    '¿Cómo se dice toalla en chino? Chin-chu-seca.',
    '¿Qué le dice un sobre a una carta? Te voy a envolver.',
    '¿Cómo se dice jabón en chino? Chin-chu-espuma.',
    '¿Qué le dice un armario a otro? Me tienes lleno.',
    '¿Cómo se dice plato en chino? Chin-chu-come.',
    '¿Qué le dice un espejo a una pared? Eres muy rígida.',
    '¿Cómo se dice fregona en chino? Chin-chu-limpia.',
    '¿Qué le dice una aspiradora a otra? Aspiramos a mucho.',
    '¿Cómo se dice basura en chino? Chin-chu-tira.',
    '¿Qué le dice un mando a distancia a otro? Me cambias la vida.',
    '¿Cómo se dice batería en chino? Chin-chu-carga.',
    '¿Qué le dice una bombilla a un interruptor? Me enciendes.',
    '¿Cómo se dice enchufe en chino? Chin-chu-corriente.',
    '¿Qué le dice un sofá a otro? Descansamos juntos.',
    '¿Cómo se dice alfombra en chino? Chin-chu-pisa.',
    '¿Qué le dice una maceta a otra? Crecemos juntas.',
    '¿Cómo se dice cortacésped en chino? Chin-chu-pasto.',
    '¿Qué le dice una percha a otra? Estamos colgadas.',
    '¿Cómo se dice despertador en chino? Chin-chu-suena.'
  ],
  tiozao: [
    '¿Qué le dice un pez a otro pez? Nada.',
    '¿Cómo se queda un mago después de comer? Magordito.',
    '¿Qué le dice una piedra a otra? ¡Qué dura es la vida!',
    '¿Cuál es el colmo de un jardinero? Que siempre lo dejen plantado.',
    '¿Qué hace una abeja en el gimnasio? Zumba.',
    '¿Qué le dice un techo a otro techo? Te echo de menos.',
    '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
    '¿Cómo se dice "chiste malo" en chino? Chin-chiste.',
    '¿Qué le dice un semáforo a otro? ¡No me mires, que me estoy cambiando!',
    '¿Por qué el libro de matemáticas está triste? Porque tiene demasiados problemas.',
    '¿Qué hace un perro con un taladro? Taladrando.',
    '¿Qué le dice un jaguar a otro? Jaguar you?',
    '¿Cómo se dice "espejo" en japonés? Aito-yito.',
    '¿Cuál es el colmo de un calvo? Que le regalen un peine.',
    '¿Qué le dice un tomate a otro? ¡Qué rojo te ves!',
    '¿Qué hace una vaca con los ojos cerrados? Leche concentrada.',
    '¿Por qué los esqueletos no pelean? Porque no tienen agallas.',
    '¿Qué le dice un gusano a otro? ¿Vamos a dar la vuelta a la manzana?',
    '¿Cómo se dice "baño" en chino? Toka-toka.',
    '¿Qué le dice una uva a otra? ¿Por qué estás morada?',
    '¿Cuál es el colmo de un sordo? Que no le escuchen.',
    '¿Qué hace una mosca en un avión? Pilota.',
    '¿Por qué el ordenador fue al médico? Porque tenía un virus.',
    '¿Qué le dice una taza a otra? ¿Taza-taza?',
    '¿Cómo se dice "zapatos" en chino? Chin-flay.',
    '¿Qué le dice un 0 a otro 0? No somos nada.',
    '¿Cuál es el colmo de un electricista? Que su mujer no le siga la corriente.',
    '¿Qué hace un pez en el agua? Mojarse.',
    '¿Por qué la gallina cruzó la calle? Para llegar al otro lado.',
    '¿Qué le dice un fantasma a otro? ¿Tú crees en la gente?',
    '¿Cómo se dice "suegra" en griego? Estor-boides.',
    '¿Qué le dice una tortuga a otra? ¡Qué rápido vamos!',
    '¿Cuál es el colmo de un arquitecto? Tener un hijo plano.',
    '¿Qué hace un astronauta en el bar? Toma algo de espacio.',
    '¿Por qué el sol va a la escuela? Para iluminarse.',
    '¿Qué le dice un zapato a otro? ¡Qué par de tontos!',
    '¿Cómo se dice "sueldo" en chino? Chin-chu-paga.',
    '¿Qué le dice una bufanda a otra? Te voy a dar un abrazo.',
    '¿Cuál es el colmo de un jugador de cartas? Perder los papeles.',
    '¿Qué hace un árbol en un banco? Esperar.',
    '¿Por qué el elefante no usa ordenador? Porque tiene miedo al ratón.',
    '¿Qué le dice un calcetín a otro? Me dejas solo.',
    '¿Cómo se dice "policía" en chino? Chin-chu-deten.',
    '¿Qué le dice una puerta a otra? ¡Qué bien cerrada estás!',
    '¿Cuál es el colmo de un cartero? No saber la dirección.',
    '¿Qué hace una sandía en un coche? Conducir con cuidado.',
    '¿Por qué el coche fue al mecánico? Porque estaba cansado.',
    '¿Qué le dice un libro a otro? ¡Qué historia tienes!',
    '¿Cómo se dice "trabajo" en chino? Chin-chu-laburo.',
    '¿Qué le dice una lámpara a otra? ¡Qué luz das!',
    '¿Cuál es el colmo de un ciego? Llamarse Casimiro.',
    '¿Qué hace un tomate en una carrera? Va a toda salsa.',
    '¿Por qué el teléfono se puso rojo? Porque vio a la señora mesa.',
    '¿Qué le dice un tenedor a una cuchara? ¡Eres muy profunda!',
    '¿Cómo se dice "esposa" en chino? Chin-chu-manda.',
    '¿Qué le dice un peine a otro? ¡Qué pelado estás!',
    '¿Cuál es el colmo de un panadero? Que le roben el pan.',
    '¿Qué hace un pingüino en el desierto? Pasar calor.',
    '¿Por qué la escoba estaba feliz? Porque barrió con todo.',
    '¿Qué le dice una aguja a otra? ¡Qué pinchazo!',
    '¿Cómo se dice "jefe" en chino? Chin-chu-manda.',
    '¿Qué le dice un sobre a una carta? ¡Qué sello tienes!',
    '¿Cuál es el colmo de un médico? Estar enfermo.',
    '¿Qué hace una silla en la playa? Tomar el sol.',
    '¿Por qué el pato fue al psicólogo? Porque estaba deprimido.',
    '¿Qué le dice un televisor a otro? ¡Qué canales tienes!',
    '¿Cómo se dice "dinero" en chino? Chin-chu-caja.',
    '¿Qué le dice un botón a otro? ¡Qué agujero tienes!',
    '¿Cuál es el colmo de un abogado? Tener una demanda.',
    '¿Qué hace una cebolla en el gimnasio? Llorar.',
    '¿Por qué el despertador fue al colegio? Para aprender a sonar.',
    '¿Qué le dice una toalla a otra? ¡Qué seca estás!',
    '¿Cómo se dice "casa" en chino? Chin-chu-techo.',
    '¿Qué le dice un calcetín a un pie? ¡Qué olor!',
    '¿Cuál es el colmo de un zapatero? Que le quede grande el zapato.'
  ],
  cotidiano: [
    'Mi vida es como un libro de chistes, pero sin la parte de la gracia.',
    'He decidido hacerme deportista: hoy he corrido... a comprar comida.',
    'Mi cuenta bancaria es tan triste que hasta el cajero me da el pésame.',
    'Mi "yo" del futuro debe estar odiando todas mis decisiones actuales.',
    'La dieta empieza el lunes, pero no especificaron de qué año.',
    'Tengo tanto sueño que si me quedo quieto, me convierto en mueble.',
    'Mi paciencia es como el Wi-Fi de mi casa: inexistente.',
    'Hoy he intentado ser productivo, pero YouTube tenía otros planes.',
    'Mi casa es un desastre, pero yo le llamo "estilo bohemio".',
    'La edad es solo un número, lástima que mi espalda no piense lo mismo.',
    'He llegado a la edad donde mi espalda sale más que yo.',
    'Si el trabajo es salud, que trabajen los enfermos.',
    'Tengo la capacidad de olvidar por qué entré a una habitación en 3 segundos.',
    'Mi plan de fin de semana es ser feliz, o al menos no arruinarlo.',
    'Mi jefe me ha dicho que tengo un gran futuro, pero que debería empezar a trabajar.',
    'Soy un experto en procrastinar hasta que el pánico se convierte en mi motor.',
    'Mi única relación estable es con el botón de "posponer" de la alarma.',
    'La vida me dio limones, así que hice limonada y luego la tiré por accidente.',
    'Estoy en esa etapa donde el café es mi única personalidad.',
    'Mi memoria es como un colador, solo se queda lo que no sirve.',
    'A veces hablo solo porque necesito una opinión experta.',
    'Mi despertador tiene un sentido del humor muy sádico.',
    'Si la pereza fuera un deporte, yo sería medalla de oro.',
    'He intentado organizar mi vida, pero el caos es más cómodo.',
    'Mi talento oculto es hacer que las cosas fáciles parezcan un desafío.',
    'Dicen que el dinero no compra la felicidad, pero ayuda a comprar café.',
    'Mi nivel de madurez depende totalmente de la situación.',
    'Soy la prueba viviente de que el sentido común no es tan común.',
    'Mi cocina es más un museo de electrodomésticos que no uso.',
    'A veces me pregunto qué hago aquí, y luego recuerdo que vine a comer.',
    'Soy tan despistado que a veces busco las gafas teniéndolas puestas.',
    'Mi rutina de ejercicio consiste en levantar vasos de agua.',
    'Mi vida social se resume en memes que envío a mis amigos.',
    'Soy el experto en encontrar problemas donde no los hay.',
    'Mi nivel de energía está por debajo de los niveles permitidos.',
    'Si pudiera cobrar por cada vez que pienso en dormir, sería millonario.',
    'Mi mayor logro hoy fue no cerrar el portátil por error.',
    'Soy el maestro de decir "ya casi termino" cuando apenas empiezo.',
    'Mi vida es un constante "necesito vacaciones" aunque acabe de volver.',
    'Soy ese amigo que siempre llega tarde, pero con una buena historia.',
    'Mi armario es un portal dimensional donde desaparecen los calcetines.',
    'Si ser desordenado fuera un talento, sería un genio.',
    'Mi batería mental llega al 5% a las tres de la tarde.',
    'Soy un experto en ignorar las notificaciones que no me convienen.',
    'Mi vida amorosa es como un servidor caído: no responde.',
    'Soy capaz de convertir un problema pequeño en un drama épico.',
    'Mi plan de inversión es gastar todo en cosas que no necesito.',
    'Soy el mejor en encontrar razones para no salir de casa.',
    'Mi mente tiene demasiadas pestañas abiertas.',
    'Si fuera un personaje de película, sería el que muere primero.',
    'Mi dieta se basa en "si se puede comer, está bien".',
    'Soy el rey de las soluciones temporales que duran años.',
    'Mi nivel de sarcasmo es mi mecanismo de defensa.',
    'Si pudiera, viviría en pijama las 24 horas del día.',
    'Soy un experto en leer correos electrónicos y no contestarlos.',
    'Mi mayor desafío es decidir qué cenar cada noche.',
    'Soy ese tipo de persona que sonríe cuando no entiende nada.',
    'Mi vida es como una serie de televisión: muchos episodios de relleno.',
    'Soy el que se ríe de sus propios chistes, por si acaso.',
    'Mi relación con el gimnasio es complicada: él me mira, yo lo ignoro.',
    'Soy un experto en justificar compras innecesarias.',
    'Mi día ideal es uno en el que no hablo con nadie.',
    'Soy ese que dice que sí a todo, pero luego se arrepiente.',
    'Mi vida sería más fácil si tuviera una tecla de "reset".',
    'Soy experto en buscar el mando a distancia mientras lo tengo en la mano.',
    'Mi nivel de atención dura lo que un anuncio de YouTube.',
    'Si el esfuerzo fuera dinero, sería pobre.',
    'Soy el que siempre se pierde, incluso con GPS.',
    'Mi mayor superpoder es decir cosas obvias con mucha seriedad.',
    'Soy ese que siempre tiene una excusa preparada.',
    'Mi vida se rige por el lema "si funciona, no lo toques".',
    'Soy el experto en hacer planes que nunca llevaré a cabo.',
    'Mi nivel de productividad depende de cuánta cafeína haya tomado.',
    'Soy el que siempre termina hablando de cosas que nadie entiende.',
    'Mi lema es: "hoy no, quizás mañana".'
  ],
  familia: [
    'Mi madre me dice: "Si no lo encuentro yo, no existe".',
    'Mi padre cree que los ordenadores se arreglan dándoles un golpe.',
    'En mi casa, mi hermano siempre tiene la culpa, incluso si no estaba allí.',
    'Las reuniones familiares son mi prueba de fuego para la paciencia.',
    'Mi abuela piensa que si no he comido tres platos, me estoy muriendo.',
    'La frase "cuando yo tenía tu edad" es el himno nacional de mi padre.',
    'Mi madre llama a cualquier consola "la maquinita de los juegos".',
    'Mi familia no grita, simplemente tiene un tono de voz muy elevado.',
    'Tener hermanos es compartir todo, incluso cuando no quieres.',
    'Mi padre siempre dice que él nunca se pierde, solo está explorando.',
    'Mi madre cree que todo se cura con un poco de sopa.',
    'En mi familia, el mando de la tele es un objeto de poder.',
    'Mi abuelo siempre cuenta la misma historia, y siempre es más larga.',
    'Mi hermano menor es el favorito, pero él dice que soy yo.',
    'Las cenas familiares son un campo de minas de preguntas incómodas.',
    'Mi padre siempre arregla las cosas con cinta adhesiva.',
    'Mi madre siempre sabe dónde he dejado las llaves, incluso cuando yo no.',
    'En mi familia, la puntualidad es una sugerencia, no una regla.',
    'Mi abuela cree que internet es una moda pasajera.',
    'Tengo una familia tan rara que parecemos un reparto de sitcom.',
    'Mi padre piensa que las luces se apagan solas por arte de magia.',
    'Mi madre tiene un radar especial para detectar si he limpiado o no.',
    'Mi hermano mayor cree que es mi segundo padre.',
    'Mi familia cree que soy un genio informático solo por reiniciar el router.',
    'Mi padre siempre se duerme en el sofá viendo las noticias.',
    'Mi madre siempre compra comida de más, "por si acaso".',
    'La casa de mis padres es el lugar donde vuelvo a tener 10 años.',
    'Mi familia no entiende por qué trabajo tanto, pero quieren que gane mucho dinero.',
    'Mi abuela me llama cada semana para preguntar si he comido bien.',
    'Mi padre tiene más herramientas que una ferretería, pero no sabe usarlas.',
    'Mi madre insiste en que me ponga una chaqueta, incluso en verano.',
    'En mi familia, el perro siempre come mejor que nosotros.',
    'Mi hermano siempre me roba la comida del frigorífico.',
    'Mi padre siempre dice que los jóvenes de hoy no saben trabajar.',
    'Mi madre cree que todos mis amigos son una mala influencia.',
    'Mi familia tiene un grupo de WhatsApp que es mejor que cualquier serie.',
    'Mi abuelo siempre dice que su época era más difícil.',
    'Mi padre cree que la calefacción está prohibida en invierno.',
    'Mi madre siempre se entera de todo, no sé cómo lo hace.',
    'En mi familia, siempre terminamos hablando de política en la cena.',
    'Mi hermano menor es el que siempre sale ganando en todo.',
    'Mi padre dice que el coche se rompió por mi culpa, aunque no lo tocara.',
    'Mi madre siempre me recuerda todas las veces que me equivoqué.',
    'Mi familia cree que ser soltero es una enfermedad que se cura.',
    'Mi abuela me da dinero a escondidas como si fuera una criminal.',
    'Mi padre cree que sabe más que Google Maps.',
    'Mi madre siempre se preocupa por cosas que no existen.',
    'En mi familia, siempre hay alguien que opina sobre mi vida amorosa.',
    'Mi hermano es mi mejor amigo y mi peor pesadilla.',
    'Mi padre siempre intenta arreglar cosas que no tienen arreglo.',
    'Mi madre siempre dice "te lo dije" en el momento menos oportuno.',
    'Mi familia me pregunta qué hago con mi vida cada Navidad.',
    'Mi abuelo siempre tiene un caramelo en el bolsillo.',
    'Mi padre cree que él pagó la hipoteca solo con su esfuerzo.',
    'Mi madre siempre se queda sin batería en el momento más importante.',
    'En mi familia, las fotos de cuando era bebé son el arma principal.',
    'Mi hermano menor es el que siempre se libra de los castigos.',
    'Mi padre siempre cuenta chistes que nadie entiende.',
    'Mi madre siempre compara mis logros con los del hijo de la vecina.',
    'Mi familia es un caos, pero es mi caos favorito.',
    'Mi abuela cree que la televisión digital es magia negra.',
    'Mi padre cree que todos los problemas se resuelven trabajando más.',
    'Mi madre siempre compra regalos que no necesito.',
    'En mi familia, las discusiones siempre son por temas triviales.',
    'Mi hermano siempre sabe cómo sacarme de quicio.',
    'Mi padre cree que él inventó los consejos de vida.',
    'Mi madre siempre intenta ser mi mejor amiga, pero es mi madre.',
    'Mi familia tiene una capacidad infinita para la vergüenza ajena.',
    'Mi abuelo siempre se queda dormido en la mesa.',
    'Mi padre cree que la tecnología es un complot contra él.',
    'Mi madre insiste en que debería casarme y tener hijos.',
    'En mi familia, siempre hay alguien que falta a la cita.',
    'Mi hermano menor tiene más derechos que yo.',
    'Mi padre dice que siempre tiene la razón.',
    'Mi madre es la jefa absoluta de todo.'
  ],
  escola_trabalho: [
    'Mi trabajo consiste en fingir que trabajo mientras espero el fin de semana.',
    'El mejor momento del día es cuando cierro el ordenador.',
    'Mi jefe cree que "multitarea" significa hacer tres cosas mal a la vez.',
    'La reunión podría haber sido un email, pero parece que les gusta escuchar su voz.',
    'En el trabajo, mi mayor habilidad es poner cara de estar pensando.',
    'He aprendido más viendo tutoriales que en cuatro años de universidad.',
    'Mi ordenador es mi mejor amigo, pero a veces me traiciona.',
    'Si pagan por tiempo, soy el empleado más caro del mundo.',
    'La impresora solo se rompe cuando tengo mucha prisa.',
    'El café es el verdadero motor de esta oficina.',
    'Mi puesto de trabajo es un campo de batalla de papeles.',
    'Cuando digo "mañana lo tengo", quiero decir que empezaré pasado.',
    'El jefe es esa persona que llega tarde y te pregunta por qué llegaste tarde.',
    'Mi ordenador dice que no tiene espacio, pero yo tengo menos paciencia.',
    'En la escuela, el profesor explicaba y yo soñaba con el recreo.',
    'Mi trabajo se divide en 10% trabajar y 90% buscar problemas.',
    'El Excel es una herramienta que odio con todo mi corazón.',
    'En la oficina, la hora de comer es sagrada.',
    'Mi jefe me ha pedido "flexibilidad", que significa trabajar gratis.',
    'La escuela me enseñó que si no sabes la respuesta, escribe mucho.',
    'Mi trabajo actual es el que mi madre temía que tuviera.',
    'La oficina es el lugar donde los sueños van a morir.',
    'Mi ordenador es más lento que mi capacidad de reacción.',
    'En el trabajo, "urgente" significa "ahora mismo".',
    'La escuela fue la mejor etapa de mi vida, sobre todo porque no trabajaba.',
    'Mi jefe cree que somos "una familia", y eso me asusta.',
    'El café de la oficina es agua sucia con cafeína.',
    'Mi trabajo es resolver problemas que yo mismo creé.',
    'La universidad me enseñó a ser experto en el café.',
    'En la oficina, siempre hay alguien que habla demasiado.',
    'Mi jefe me pide que sea proactivo, así que me voy a casa.',
    'La escuela me enseñó que siempre puedes copiar al de al lado.',
    'Mi trabajo consiste en responder emails que nadie lee.',
    'La oficina es un lugar donde el tiempo se detiene.',
    'Mi jefe cree que los viernes son para terminar proyectos.',
    'La escuela me enseñó que la nota no importa, pero la asistencia sí.',
    'Mi trabajo es el arte de hacer parecer que estoy ocupado.',
    'La oficina es un desfile de modas de gente cansada.',
    'Mi jefe pide resultados imposibles con recursos nulos.',
    'La escuela fue una larga espera para ser adulto, gran error.',
    'Mi trabajo se resume en "Ctrl+C, Ctrl+V".',
    'La oficina es donde pierdo la fe en la humanidad.',
    'Mi jefe dice que somos un equipo, pero él gana más.',
    'La escuela me enseñó a mentir sobre mis tareas.',
    'Mi trabajo es una serie de reuniones inútiles.',
    'La oficina es el lugar donde los rumores vuelan.',
    'Mi jefe cree que el trabajo remoto es irse de vacaciones.',
    'La escuela me enseñó que la vida no es justa.',
    'Mi trabajo me da el dinero para olvidar que tengo trabajo.',
    'La oficina es donde descubro quiénes son mis verdaderos enemigos.',
    'Mi jefe pide cosas que él no sabe hacer.',
    'La escuela fue el lugar donde descubrí que soy un desastre.',
    'Mi trabajo es mantener la calma ante la incompetencia.',
    'La oficina es un lugar de café y decepción.',
    'Mi jefe cree que el estrés es parte del sueldo.',
    'La escuela me enseñó a dormir con los ojos abiertos.',
    'Mi trabajo es un ciclo interminable de errores.',
    'La oficina es donde el tiempo se vuelve relativo.',
    'Mi jefe cree que el feedback es una crítica constructiva.',
    'La escuela fue el comienzo de mi ansiedad social.',
    'Mi trabajo es ser el soporte técnico que nadie valora.',
    'La oficina es un lugar de silencios incómodos.',
    'Mi jefe pide informes que nadie leerá.',
    'La escuela me enseñó que siempre hay alguien peor que tú.',
    'Mi trabajo es encontrar el error en mi propio trabajo.',
    'La oficina es donde los sueños se convierten en tareas.',
    'Mi jefe cree que el tiempo es dinero, pero el mío no vale nada.',
    'La escuela fue el ensayo para mi vida de fracasos.',
    'Mi trabajo es ser amable con gente que detesto.',
    'La oficina es donde aprendes a odiar los lunes.',
    'Mi jefe pide milagros y yo solo soy un empleado.',
    'La escuela me enseñó que estudiar es una pérdida de tiempo.',
    'Mi trabajo es sobrevivir al horario de oficina.',
    'La oficina es donde me pregunto: "¿Qué hago aquí?".',
    'Mi jefe cree que el trabajo nos hace libres, yo creo que nos hace esclavos.'
  ],
  absurdo: [
    'Un pez se cae de un quinto piso y hace: ¡plop!',
    '¿Qué hace un perro con un cuchillo? Cortar jamón.',
    '¿Qué le dice un tornado a otro? Vamos a dar una vuelta.',
    'Había una vez un perro que se llamaba "Chiste" y lo atropellaron.',
    '¿Cómo se dice "inútil" en chino? Chin-chu-lla.',
    '¿Qué hace un elefante con un patinete? ¡Lo rompe!',
    '¿Qué es verde y sube y baja? Un guisante en un ascensor.',
    'Había un hombre tan alto que se tenía que agachar para ver el cielo.',
    '¿Qué le dice una mosca a otra? ¡Cuidado con el cristal!',
    '¿Qué hace una vaca en el espacio? ¡Viajar en vaca-ción!',
    '¿Qué es un pez en el agua? Un pez.',
    'Había una vez un gato que quería ser perro, pero le faltaba el guau.',
    '¿Qué le dice un cable a un enchufe? ¡Conéctame!',
    '¿Qué es pequeño, rojo y sube y baja? Un tomate en un ascensor.',
    '¿Qué hace un tomate en una iglesia? ¡Rezar!',
    'Había una vez una mesa que se sentía silla.',
    '¿Qué le dice un coche a una pared? ¡Bum!',
    '¿Qué es grande, azul y tiene cuatro patas? Un elefante disfrazado.',
    '¿Qué hace un libro en un horno? ¡Asarse!',
    'Había una vez un hombre que vivía en una caja de zapatos.',
    '¿Qué le dice un tenedor a una cuchara? ¡No me toques!',
    '¿Qué es una mosca con un traje? Un ejecutivo.',
    '¿Qué hace un pingüino en una oficina? ¡Trabajar!',
    'Había una vez una piedra que quería volar.',
    '¿Qué le dice un calcetín a otro? ¡Qué mal hueles!',
    '¿Qué es una silla con alas? ¡Un pájaro mueble!',
    '¿Qué hace un sol en la luna? ¡Nada!',
    'Había una vez un ordenador que sabía cocinar.',
    '¿Qué le dice una puerta a otra? ¡No me abras!',
    '¿Qué es un pez con sombrero? ¡Un pez elegante!',
    '¿Qué hace un despertador sin pilas? ¡Nada!',
    'Había una vez una naranja que se creía limón.',
    '¿Qué le dice una lámpara a un sol? ¡Eres demasiado brillante!',
    '¿Qué es una hormiga con un camión? ¡Una hormiga transportista!',
    '¿Qué hace un zapato en el techo? ¡Caminar por las paredes!',
    'Había una vez una nube con forma de silla.',
    '¿Qué le dice una toalla a otra? ¡Te has secado!',
    '¿Qué es un gato sin pelo? ¡Un gato con frío!',
    '¿Qué hace un coche volando? ¡Volar!',
    'Había una vez un lápiz que no tenía punta.',
    '¿Qué le dice una carta a un sobre? ¡No me guardes!',
    '¿Qué es una taza sin café? ¡Un recipiente vacío!',
    '¿Qué hace una aspiradora en el campo? ¡Aspirar césped!',
    'Había una vez un botón sin camisa.',
    '¿Qué le dice un espejo a un vaso? ¡Te veo transparente!',
    '¿Qué es un perro que canta? ¡Un perro prodigio!',
    '¿Qué hace una cebolla en el mar? ¡Llorar!',
    'Había una vez un semáforo que siempre estaba en azul.',
    '¿Qué le dice un mando a la tele? ¡Cámbiate!',
    '¿Qué es un pato en una bici? ¡Un pato ciclista!',
    '¿Qué hace un martillo en un árbol? ¡Martillear!',
    'Había una vez una escoba que bailaba sola.',
    '¿Qué le dice un armario a la ropa? ¡Fuera!',
    '¿Qué es una cuchara sin sopa? ¡Un metal innecesario!',
    '¿Qué hace un pez en la tierra? ¡Morirse!',
    'Había una vez una almohada que soñaba.',
    '¿Qué le dice un despertador a una cama? ¡Despierta!',
    '¿Qué es un árbol sin hojas? ¡Un palo!',
    '¿Qué hace una maceta en el aire? ¡Caerse!',
    'Había una vez un reloj que corría hacia atrás.',
    '¿Qué le dice una cortina a una ventana? ¡Tápate!',
    '¿Qué es una llave sin puerta? ¡Un metal perdido!',
    '¿Qué hace un jabón en el suelo? ¡Resbalar!',
    'Había una vez un sillón que caminaba.',
    '¿Qué le dice un peine al pelo? ¡Ven aquí!',
    '¿Qué es un plato sin comida? ¡Una superficie plana!',
    '¿Qué hace una percha en la nevera? ¡Colgar comida!',
    'Había una vez un mando que no funcionaba.',
    '¿Qué le dice una bombilla al techo? ¡Qué oscuro estás!',
    '¿Qué es un enchufe sin cable? ¡Un agujero en la pared!',
    '¿Qué hace una alfombra en el techo? ¡Nada!',
    'Había una vez un despertador que no sonaba.',
    '¿Qué le dice una nevera a la comida? ¡Te voy a enfriar!',
    '¿Qué es un cortacésped sin césped? ¡Un ruido innecesario!',
    '¿Qué hace una cortina en la cocina? ¡Tapar la luz!'
  ]
}; 
    
    const DEFAULT_JOKES_FR = {
  trocadilhos: [
    'Quel est le comble pour un électricien? Ne pas être au courant.',
    'Pourquoi les plongeurs plongent-ils toujours en arrière? Parce que sinon ils tombent dans le bateau.',
    'Qu’est-ce qui est petit et qui fait "peur-peur"? Un petit pois qui fait peur.',
    'Quel est le comble pour un jardinier? D\'avoir la main verte.',
    'Pourquoi les oiseaux volent-ils vers le sud en hiver? Parce que c\'est trop long d\'y aller à pied.',
    'Quel est le comble pour un coiffeur? De se couper les cheveux en quatre.',
    'Pourquoi les poissons vivent-ils dans l\'eau salée? Parce que le poivre les fait éternuer.',
    'Quel est le comble pour un horloger? D\'être toujours en retard.',
    'Pourquoi les chats ne jouent-ils pas au poker dans la jungle? Parce qu\'il y a trop de guépards.',
    'Quel est le comble pour un marin? D\'avoir le pied marin.',
    'Pourquoi les vaches ferment-elles les yeux quand on les trait? Pour faire du lait concentré.',
    'Quel est le comble pour un boulanger? De perdre son pain.',
    'Pourquoi les banques sont-elles froides? À cause du courant d\'air.',
    'Quel est le comble pour un architecte? De manquer de plan.',
    'Pourquoi les fantômes sont-ils de mauvais menteurs? Parce qu\'on voit à travers eux.',
    'Quel est le comble pour un pompier? De ne pas avoir de flamme.',
    'Pourquoi les gorilles ont-ils de grosses narines? Parce qu\'ils ont de gros doigts.',
    'Quel est le comble pour un informaticien? De perdre la souris.',
    'Pourquoi les sorcières volent-elles sur un balai? Parce que les aspirateurs sont trop lourds.',
    'Quel est le comble pour un avocat? De ne pas avoir de défense.',
    'Pourquoi les moutons sont-ils toujours pressés? Parce qu\'ils ont peur de se faire tondre.',
    'Quel est le comble pour un opticien? De voir la vie en flou.',
    'Pourquoi les escargots sont-ils les plus forts? Parce qu\'ils portent leur maison sur leur dos.',
    'Quel est le comble pour un boxeur? De se faire mettre K.O. par un mot.',
    'Pourquoi les étoiles brillent-elles? Pour qu\'on puisse les trouver la nuit.',
    'Quel est le comble pour un astronaute? D\'avoir la tête dans les étoiles.',
    'Pourquoi les crayons ne sortent-ils jamais? Parce qu\'ils ont peur de la gomme.',
    'Quel est le comble pour un pâtissier? D\'être dans le pétrin.',
    'Pourquoi les clés sont-elles toujours perdues? Parce qu\'elles ont peur d\'ouvrir la porte.',
    'Quel est le comble pour un dentiste? De mordre à l\'hameçon.',
    'Pourquoi les feuilles tombent-elles en automne? Parce qu\'elles sont fatiguées.',
    'Quel est le comble pour un chef cuisinier? De ne pas avoir de goût.',
    'Pourquoi les chaussettes disparaissent-elles? Parce qu\'elles vont à l\'école des chaussettes.',
    'Quel est le comble pour un géologue? De se faire rouler par une pierre.',
    'Pourquoi les montres sont-elles intelligentes? Parce qu\'elles ont des aiguilles.',
    'Quel est le comble pour un athlète? De manquer de souffle.',
    'Pourquoi les crayons de couleur sont-ils tristes? Parce qu\'ils ont le moral à zéro.',
    'Quel est le comble pour un musicien? De perdre le rythme.',
    'Pourquoi les parapluies sont-ils utiles? Parce qu\'ils ont peur de la pluie.',
    'Quel est le comble pour un photographe? De ne pas être développé.',
    'Pourquoi les vélos sont-ils fatigués? Parce qu\'ils ont deux pneus.',
    'Quel est le comble pour un médecin? De tomber malade.',
    'Pourquoi les portes claquent-elles? Parce qu\'elles sont énervées.',
    'Quel est le comble pour un professeur? De sécher les cours.',
    'Pourquoi les miroirs sont-ils réfléchis? Parce qu\'ils pensent beaucoup.',
    'Quel est le comble pour un coq? De perdre sa voix.',
    'Pourquoi les livres sont-ils muets? Parce qu\'ils attendent qu\'on les lise.',
    'Quel est le comble pour un tailleur? De ne pas être bien ajusté.',
    'Pourquoi les ballons s\'envolent-ils? Parce qu\'ils ont la tête légère.',
    'Quel est le comble pour un jardinier? De se faire planter.',
    'Pourquoi les ordinateurs sont-ils froids? Parce qu\'ils ont des Windows ouverts.',
    'Quel est le comble pour un facteur? De ne pas avoir de lettre.',
    'Pourquoi les gâteaux sont-ils gourmands? Parce qu\'ils sont fourrés.',
    'Quel est le comble pour un ébéniste? D\'être en bois.',
    'Pourquoi les tables sont-elles stables? Parce qu\'elles ont quatre pieds.',
    'Quel est le comble pour un policier? De se faire menotter.',
    'Pourquoi les chaises sont-elles fragiles? Parce qu\'elles ont le dos cassé.',
    'Quel est le comble pour un joueur de tennis? De ne pas avoir de filet.',
    'Pourquoi les ampoules brillent-elles? Parce qu\'elles ont une idée.',
    'Quel est le comble pour un électricien? De ne pas avoir de prise.',
    'Pourquoi les échelles sont-elles hautes? Parce qu\'elles ont des barreaux.',
    'Quel est le comble pour un pêcheur? De ne pas avoir de ligne.',
    'Pourquoi les chaussures sont-elles lacées? Parce qu\'elles ont peur de se déchausser.',
    'Quel est le comble pour un mineur? De se faire enterrer.',
    'Pourquoi les pneus sont-ils ronds? Pour tourner en rond.',
    'Quel est le comble pour un écrivain? De manquer d\'encre.',
    'Pourquoi les bouteilles sont-elles pleines? Parce qu\'elles ont bu.',
    'Quel est le comble pour un écolier? De ne pas avoir de cartable.',
    'Pourquoi les avions volent-ils? Parce qu\'ils ont des ailes.',
    'Quel est le comble pour un roi? De perdre sa couronne.',
    'Pourquoi les lunettes sont-elles fragiles? Parce qu\'elles ont des verres.',
    'Quel est le comble pour un artiste? De ne pas avoir de cadre.',
    'Pourquoi les valises sont-elles lourdes? Parce qu\'elles sont pleines.',
    'Quel est le comble pour un dormeur? De se réveiller.',
    'Pourquoi les chats sont-ils élégants? Parce qu\'ils sont chics.'
  ],
  tiozao: [
    'Quelle est la différence entre un thermomètre et un thermomètre rectal? Le goût.',
    'Pourquoi les plongeurs plongent-ils toujours en arrière? Sinon ils tombent dans le bateau.',
    'Qu\'est-ce qui est petit et qui fait "peur-peur"? Un petit pois qui fait peur.',
    'Tu connais l\'histoire de Toto aux toilettes? Non? Bah, il a tiré la chasse.',
    'Pourquoi les vaches ferment-elles les yeux? Pour faire du lait concentré.',
    'Quelle est la différence entre un policier et un voleur? Le policier a un uniforme.',
    'Qu\'est-ce qu\'une tomate qui fait la course? Un ketchup.',
    'Pourquoi les oiseaux volent-ils vers le sud? C\'est trop long d\'y aller à pied.',
    'Comment appelle-t-on un boomerang qui ne revient pas? Un bâton.',
    'Pourquoi les gorilles ont-ils de grosses narines? Parce qu\'ils ont de gros doigts.',
    'Tu connais la blague du petit déjeuner? Pas la peine, elle n\'est pas fraîche.',
    'Qu\'est-ce qui est jaune et qui court très vite? Un citron pressé.',
    'Pourquoi les fantômes sont-ils de mauvais menteurs? On voit à travers eux.',
    'Qu\'est-ce qui est plus fort qu\'un dragon? Un dragon qui a mangé de l\'ail.',
    'Comment appelle-t-on un chat qui va dans l\'espace? Un chat-tronaute.',
    'Pourquoi les poissons vivent-ils dans l\'eau salée? Le poivre les fait éternuer.',
    'Quelle est la différence entre un piano et un thon? On peut thon-ner, mais on ne peut pas piano-ner.',
    'Pourquoi les étoiles brillent-elles? Pour qu\'on puisse les trouver la nuit.',
    'Qu\'est-ce qui a quatre pattes et un bras? Un pitbull dans une cour d\'école.',
    'Comment appelle-t-on un chien qui fait de la magie? Un Labracadabrador.',
    'Pourquoi les sorcières volent-elles sur un balai? Les aspirateurs sont trop lourds.',
    'Qu\'est-ce qui est vert et qui monte et descend? Un petit pois dans un ascenseur.',
    'Pourquoi les moutons sont-ils pressés? Ils ont peur de se faire tondre.',
    'Comment appelle-t-on un boomerang qui revient tout seul? Un boomerang.',
    'Qu\'est-ce qui est pire qu\'un cheveu dans la soupe? Un chauve dans la soupe.',
    'Pourquoi les chaussettes disparaissent-elles? À l\'école des chaussettes.',
    'Quelle est la différence entre un thermomètre et un thermomètre buccal? La température.',
    'Qu\'est-ce qui a 40 dents et qui garde le vieux chien? Une mâchoire.',
    'Pourquoi les pneus sont-ils ronds? Pour tourner en rond.',
    'Comment appelle-t-on un ours sans dents? Un ours en guimauve.',
    'Qu\'est-ce qui est blanc et qui ne fait pas de bruit? Un fantôme muet.',
    'Pourquoi les vélos sont-ils fatigués? Ils ont deux pneus.',
    'Quelle est la différence entre un jardinier et une voiture? La voiture a un moteur.',
    'Qu\'est-ce qui est petit et qui fait "tic-tac"? Une petite montre.',
    'Pourquoi les banques sont-elles froides? À cause du courant d\'air.',
    'Comment appelle-t-on un chameau à trois bosses? Un accident.',
    'Qu\'est-ce qui est rouge et qui fait "bruit"? Un camion de pompiers.',
    'Pourquoi les crayons ont-ils peur? Ils craignent la gomme.',
    'Quelle est la différence entre un avocat et un avocat? Il n\'y en a pas.',
    'Qu\'est-ce qui a deux pattes et qui saigne? La moitié d\'un chien.',
    'Pourquoi les ampoules ont-elles des idées? Elles sont brillantes.',
    'Comment appelle-t-on une vache qui rit? Une vache à lait.',
    'Qu\'est-ce qui est bleu et qui fait "bruit"? Un schtroumpf en colère.',
    'Pourquoi les portes claquent-elles? Elles sont énervées.',
    'Quelle est la différence entre un dentiste et un sadique? La perceuse.',
    'Qu\'est-ce qui a 100 pieds et qui ne marche pas? Un cent-pieds mort.',
    'Pourquoi les livres sont-ils muets? Ils attendent qu\'on les lise.',
    'Comment appelle-t-on un serpent qui fait des pompes? Un boa-muscle.',
    'Qu\'est-ce qui est gris et qui fait "vroum"? Un éléphant en moto.',
    'Pourquoi les montres ont-elles des aiguilles? Pour piquer le temps.',
    'Quelle est la différence entre un roi et un boulanger? Le roi est couronné.',
    'Qu\'est-ce qui a trois yeux et qui ne voit rien? Une pomme de terre.',
    'Pourquoi les gâteaux sont-ils gourmands? Ils sont fourrés.',
    'Comment appelle-t-on un oiseau qui fait du vélo? Un oiseau-cycliste.',
    'Qu\'est-ce qui est noir et blanc et qui fait "boom"? Un pingouin dans un four.',
    'Pourquoi les échelles sont-elles hautes? Elles ont des barreaux.',
    'Quelle est la différence entre un prof et un dieu? Le dieu ne se prend pas pour un prof.',
    'Qu\'est-ce qui a huit bras et qui fait des câlins? Une pieuvre amoureuse.',
    'Pourquoi les chaussures sont-elles lacées? Elles ont peur de se déchausser.',
    'Comment appelle-t-on un homme qui a un nez? Un nez-homme.',
    'Qu\'est-ce qui est petit et qui tombe du ciel? La pluie.',
    'Pourquoi les bouteilles boivent-elles? Parce qu\'elles sont pleines.',
    'Quelle est la différence entre un pigeon et un bureau? Le pigeon peut voler.',
    'Qu\'est-ce qui a une langue et qui ne parle pas? Une chaussure.',
    'Pourquoi les avions volent-ils? Ils ont des ailes.',
    'Comment appelle-t-on un cheval qui fait du ping-pong? Un cheval-pong.',
    'Qu\'est-ce qui est plat et qui fait "couic"? Une souris écrasée.',
    'Pourquoi les miroirs sont-ils réfléchis? Ils pensent beaucoup.',
    'Quelle est la différence entre un chien et un téléphone? Le téléphone a un fil.',
    'Qu\'est-ce qui est jaune et qui fait "boom"? Une banane explosive.',
    'Pourquoi les chaises ont-elles quatre pieds? Pour ne pas tomber.',
    'Comment appelle-t-on un homme avec une pelle? Un homme-pelle.',
    'Qu\'est-ce qui est grand et qui mange tout? Un trou noir.',
    'Pourquoi les ballons s\'envolent? Ils ont la tête légère.',
    'Quelle est la différence entre un coq et une poule? Le coq a des plumes de couleur.'
  ],
  cotidiano: [
    'Je voulais être normal, mais c\'était trop ennuyeux.',
    'Ma vie est une série de "pourquoi j\'ai fait ça?".',
    'La motivation est comme un chat, elle ne vient que si elle veut.',
    'Je ne suis pas paresseux, je suis en mode économie d\'énergie.',
    'Mon lit est un endroit magique où je retrouve tout ce que j\'ai perdu.',
    'J\'ai un régime très strict : je ne mange que ce que je veux.',
    'Je ne parle pas seul, je m\'explique les choses.',
    'Ma patience a des limites, mais elle est très tolérante.',
    'Je suis né pour briller, mais j\'ai oublié d\'allumer la lumière.',
    'Mon compte bancaire est une œuvre de fiction.',
    'La vie est courte, souriez tant que vous avez encore des dents.',
    'Je n\'ai pas échoué, j\'ai trouvé dix façons qui ne fonctionnent pas.',
    'Si le travail était bon pour la santé, ça se saurait.',
    'Je ne suis pas en retard, je suis en avance pour la prochaine fois.',
    'Mon niveau de maturité dépend de la personne avec qui je suis.',
    'Je suis un expert en procrastinant tout ce qui est important.',
    'Le café est ma seule raison de me lever le matin.',
    'Je n\'ai pas de problèmes, j\'ai des défis passionnants.',
    'Mon ordinateur pense que je travaille, mais je joue au solitaire.',
    'Je suis la preuve vivante que l\'intelligence n\'est pas héréditaire.',
    'Ma cuisine est un endroit où je réchauffe des plats surgelés.',
    'Je ne perds jamais mes affaires, je les cache pour me surprendre.',
    'La vérité blesse, mais le mensonge est trop fatiguant.',
    'Je suis un génie méconnu, surtout par moi-même.',
    'La vie est une blague, mais je ne trouve pas la chute.',
    'Je suis le roi du "je le ferai demain".',
    'Ma mémoire est comme une passoire, tout passe à travers.',
    'Je ne suis pas bizarre, je suis une édition limitée.',
    'La perfection est ennuyeuse, alors je préfère être imparfait.',
    'Mon jardinage consiste à regarder mes plantes mourir.',
    'Je ne suis pas bavard, j\'ai beaucoup de choses à dire.',
    'La vie est un voyage, mais j\'ai oublié ma carte.',
    'Je suis un maître dans l\'art de ne rien faire.',
    'Mon chat est le patron de la maison.',
    'Je ne suis pas grincheux, je suis réaliste.',
    'Le silence est d\'or, mais mon bavardage est de platine.',
    'Je suis un spécialiste en solutions temporaires.',
    'Ma routine quotidienne est très simple : survivre.',
    'Je n\'ai pas de défauts, j\'ai des particularités.',
    'La sagesse vient avec l\'âge, je l\'attends encore.',
    'Je suis un explorateur de canapé.',
    'Mon talent caché est de rater des choses faciles.',
    'Je ne cherche pas les ennuis, ils me trouvent.',
    'Ma vie sociale est limitée à mes messages privés.',
    'Je suis toujours prêt à apprendre, surtout des erreurs des autres.',
    'La vie est un test, et j\'ai oublié de réviser.',
    'Mon seul superpouvoir est de trouver des excuses.',
    'Je ne suis pas têtu, j\'ai juste raison.',
    'La simplicité est la sophistication ultime.',
    'Je suis un collectionneur de moments perdus.',
    'Ma batterie sociale est toujours à zéro.',
    'Je ne suis pas fan des lundis, c\'est un euphémisme.',
    'La vie est dure, mais je suis plus têtu.',
    'Mon esprit est un labyrinthe sans sortie.',
    'Je suis un expert en faire semblant d\'écouter.',
    'La chance est une question de timing.',
    'Je suis un aventurier du dimanche.',
    'Ma philosophie est : pourquoi faire simple quand on peut faire compliqué?',
    'Je ne suis pas impulsif, je suis passionné.',
    'La vie est un film, mais je suis un figurant.',
    'Mon sens de l\'orientation est un défi pour la science.',
    'Je suis un amoureux de la sieste.',
    'La vie est belle, mais parfois elle est moche.',
    'Je suis un éternel optimiste, malgré les preuves.',
    'Mon talent est de compliquer les choses simples.',
    'Je suis un maître en désorganisation.',
    'La vie est un jeu, mais je ne connais pas les règles.',
    'Je ne suis pas paresseux, je suis en mode "non-action".',
    'Mon niveau de fatigue est un art.',
    'Je suis un expert en oublier mes clés.',
    'La vie est une fête, mais je suis parti dormir.',
    'Je suis un fan de la liberté, surtout celle de ne rien faire.',
    'Mon esprit est une bibliothèque en désordre.',
    'Je ne suis pas parfait, je suis authentique.',
    'La vie est un défi, je l\'accepte avec café.'
  ],
  familia: [
    'Ma mère me demande toujours si j\'ai bien mangé, même à minuit.',
    'Mon père croit que tous les problèmes se règlent avec du scotch.',
    'Dans ma famille, on ne discute pas, on débat jusqu\'à épuisement.',
    'Ma sœur pense qu\'elle est le centre du monde, elle a raison.',
    'Mon frère est la preuve vivante qu\'on peut être né d\'une erreur.',
    'Le groupe WhatsApp de la famille est une source de stress constant.',
    'Ma grand-mère pense que tout se soigne avec une tisane.',
    'Mon père dit qu\'il n\'a jamais tort, juste une opinion différente.',
    'Dans ma famille, être à l\'heure, c\'est arriver avec une heure de retard.',
    'Ma mère croit que mon ordinateur est le diable en personne.',
    'Mon frère pense qu\'il est plus intelligent que tout le monde.',
    'Les dîners de famille sont un sport extrême.',
    'Ma sœur me vole mes vêtements, et elle dit que c\'est "partagé".',
    'Mon père croit que la musique d\'aujourd\'hui n\'est que du bruit.',
    'Dans ma famille, le silence est un concept inconnu.',
    'Ma mère a un radar pour savoir quand je ne fais rien.',
    'Mon frère croit qu\'il est le favori, pauvre de lui.',
    'Les photos de famille sont la preuve de mon passé embarrassant.',
    'Ma grand-mère me demande toujours quand je vais me marier.',
    'Mon père pense qu\'il peut réparer une voiture avec une fourchette.',
    'Dans ma famille, on finit toujours par parler politique.',
    'Ma mère croit que tous mes amis sont de mauvaises influences.',
    'Mon frère pense qu\'il est un chef étoilé avec des pâtes.',
    'Les vacances en famille sont le meilleur moyen de se détester.',
    'Ma grand-mère a une collection de mouchoirs inutiles.',
    'Mon père croit que les jeunes d\'aujourd\'hui sont tous des flemmards.',
    'Dans ma famille, on a toujours raison, sauf quand on a tort.',
    'Ma mère est une détective privée à temps plein.',
    'Mon frère pense qu\'il est un génie en informatique.',
    'Les réunions de famille sont un test de survie.',
    'Ma grand-mère me raconte la même histoire chaque semaine.',
    'Mon père pense que je devrais être médecin ou avocat.',
    'Dans ma famille, la nourriture est la seule solution aux problèmes.',
    'Ma mère pense que je n\'ai jamais assez chaud.',
    'Mon frère pense qu\'il est un athlète olympique de jeu vidéo.',
    'Les discussions en famille sont des marathons de cris.',
    'Ma grand-mère croit qu\'internet est magique.',
    'Mon père pense qu\'il a toujours la meilleure solution.',
    'Dans ma famille, on ne dit jamais pardon.',
    'Ma mère est une experte en culpabilisation.',
    'Mon frère pense qu\'il est un séducteur hors pair.',
    'Les vacances familiales sont un enfer paradisiaque.',
    'Ma grand-mère collectionne les boîtes vides.',
    'Mon père pense que je devrais travailler plus.',
    'Dans ma famille, on aime beaucoup trop manger.',
    'Ma mère croit que tout ce que je fais est dangereux.',
    'Mon frère pense qu\'il est un visionnaire.',
    'Les fêtes de famille sont une torture nécessaire.',
    'Ma grand-mère m\'appelle toujours par le prénom de mon frère.',
    'Mon père pense qu\'il a inventé la roue.',
    'Dans ma famille, on n\'est jamais d\'accord sur le film.',
    'Ma mère pense que je devrais être plus ordonné.',
    'Mon frère pense qu\'il est le roi du monde.',
    'Les sorties familiales sont des missions impossibles.',
    'Ma grand-mère m\'offre toujours des chaussettes trop grandes.',
    'Mon père pense qu\'il est un génie de la finance.',
    'Dans ma famille, tout le monde parle en même temps.',
    'Ma mère croit que le sucre est un poison mortel.',
    'Mon frère pense qu\'il est un philosophe.',
    'Les repas de famille durent toujours trop longtemps.',
    'Ma grand-mère m\'offre des gâteaux périmés.',
    'Mon père pense que je devrais tout savoir faire.',
    'Dans ma famille, on aime bien se plaindre.',
    'Ma mère pense que je ne dors pas assez.',
    'Mon frère pense qu\'il est le meilleur danseur.',
    'Les réunions familiales sont des tragédies grecques.',
    'Ma grand-mère croit aux fantômes.',
    'Mon père pense que le monde va à sa perte.',
    'Dans ma famille, on est tous un peu fous.',
    'Ma mère pense que je devrais être plus poli.',
    'Mon frère pense qu\'il est un génie méconnu.',
    'Les vacances familiales sont des tests de patience.',
    'Ma grand-mère m\'aime, je crois.',
    'Mon père pense que je devrais être plus sérieux.',
    'Dans ma famille, on s\'aime, mais de loin.'
  ],
  escola_trabalho: [
    'Mon travail est une blague, mais sans le rire.',
    'Le meilleur moment de la journée, c\'est quand je rentre chez moi.',
    'Mon patron croit que le travail est une passion, je crois que c\'est une corvée.',
    'La réunion aurait pu être un e-mail, mais c\'est moins ennuyeux.',
    'Mon ordinateur a une vie propre, et il ne m\'aime pas.',
    'Je travaille pour survivre, pas par vocation.',
    'Le café de la machine est une insulte au café.',
    'Mon patron demande des miracles, je livre du minimum.',
    'La deadline est un concept abstrait pour moi.',
    'Je ne suis pas lent, je suis méthodique.',
    'Mon bureau est un sanctuaire de désordre.',
    'L\'école était un entraînement pour ma vie de bureau.',
    'Mon patron croit que tout est urgent, rien ne l\'est.',
    'Je suis un expert en faire semblant de travailler.',
    'Mon collègue parle trop, j\'ai besoin d\'un casque anti-bruit.',
    'La motivation au travail est une légende urbaine.',
    'Je ne cherche pas le succès, je cherche le salaire.',
    'Mon patron est comme un nuage, quand il s\'en va, il fait beau.',
    'Le travail d\'équipe est un moyen de partager le blâme.',
    'Mon ordinateur me déteste, c\'est réciproque.',
    'La pause café est le seul intérêt du travail.',
    'Je suis un professionnel de l\'ajournement.',
    'Mon patron pense qu\'il est mon ami.',
    'L\'école m\'a appris à copier, le travail m\'a appris à déléguer.',
    'Mon bureau est un lieu de désespoir.',
    'Le travail est une torture quotidienne.',
    'Je suis un artiste de l\'esquive.',
    'Mon patron pense qu\'il est génial.',
    'La réunion est un trou noir pour le temps.',
    'Mon travail est une blague de mauvais goût.',
    'Je suis un expert en rater les délais.',
    'La machine à café est mon seul ami.',
    'Mon patron croit au "syndrome du vendredi".',
    'Je travaille pour oublier que je travaille.',
    'Le bureau est une prison dorée.',
    'Mon ordinateur a une âme de rebelle.',
    'Je ne suis pas payé assez pour ça.',
    'L\'école était plus amusante que ce boulot.',
    'Mon patron pense qu\'il est un leader.',
    'La réunion est une perte de temps organisée.',
    'Mon travail est un mystère pour tout le monde.',
    'Je suis un maître dans l\'art de l\'absence.',
    'Mon patron demande le ciel, je donne la terre.',
    'La pause est une nécessité vitale.',
    'Mon ordinateur est un dinosaure.',
    'Je travaille en mode pilote automatique.',
    'Le travail me rend fou, mais je reste calme.',
    'L\'école était une répétition générale.',
    'Mon patron croit en la magie des chiffres.',
    'La réunion est mon pire cauchemar.',
    'Mon travail est un puzzle sans pièces.',
    'Je suis un spécialiste en éviter les responsabilités.',
    'Mon patron demande l\'impossible, je donne le minimum.',
    'La machine à café est mon thérapeute.',
    'Mon ordinateur est mon pire ennemi.',
    'Je travaille avec le sourire, c\'est un masque.',
    'Le bureau est un lieu de travail forcé.',
    'L\'école m\'a enseigné le stress.',
    'Mon patron croit en la performance.',
    'La réunion est un vide intersidéral.',
    'Mon travail est une série d\'erreurs.',
    'Je suis un expert en faire semblant.',
    'Mon patron est une énigme.',
    'La pause est mon seul plaisir.',
    'Mon ordinateur est obsolète.',
    'Je travaille en attendant la retraite.',
    'Le travail est une nécessité triste.',
    'L\'école était une préparation au travail.',
    'Mon patron croit au bonheur au travail.',
    'La réunion est une perte de vie.',
    'Mon travail est un défi permanent.',
    'Je suis un spécialiste en survie.',
    'Mon patron demande plus que ce que je vaux.',
    'La machine à café est ma bouée de sauvetage.',
    'Le bureau est un lieu d\'exil.'
  ],
  absurdo: [
    'Pourquoi les poissons jouent-ils au piano? Parce qu\'ils ont des écailles.',
    'Qu\'est-ce qui est grand et qui mange des avions? Un avion-vince.',
    'Pourquoi les vaches font-elles du karaté? Pour le lait de frappe.',
    'Qu\'est-ce qui est petit et qui fait "meuh"? Une petite vache.',
    'Pourquoi les serpents font-ils du vélo? Pour aller voir leur boa-ami.',
    'Qu\'est-ce qui est bleu et qui fait "pouet"? Un schtroumpf écrasé.',
    'Pourquoi les chaises volent-elles dans l\'espace? Parce qu\'elles sont en apesanteur.',
    'Qu\'est-ce qui est long et qui fait "boom"? Une saucisse à retardement.',
    'Pourquoi les lapins portent-ils des lunettes? Parce qu\'ils ont des carottes.',
    'Qu\'est-ce qui est vert et qui fait "bruit"? Un concombre en colère.',
    'Pourquoi les gorilles dansent-ils sous la pluie? Pour faire de la soupe.',
    'Qu\'est-ce qui est petit, jaune et qui fait "meuh"? Un petit poussin qui a confondu sa mère.',
    'Pourquoi les fantômes mangent-ils des sandwichs? Pour être transparents.',
    'Qu\'est-ce qui est gris et qui fait "vroum"? Un hippopotame en moto.',
    'Pourquoi les tables vont-elles à l\'école? Pour apprendre les fractions.',
    'Qu\'est-ce qui est noir, blanc et qui fait "tic-tac"? Un pingouin horloger.',
    'Pourquoi les chaussettes mangent-elles des chaussures? Parce qu\'elles ont faim.',
    'Qu\'est-ce qui est petit et qui fait "bruit"? Une petite fourmi bruyante.',
    'Pourquoi les ampoules font-elles du sport? Pour rester brillantes.',
    'Qu\'est-ce qui est long, fin et qui fait "meuh"? Une vache fil de fer.',
    'Pourquoi les portes chantent-elles? Pour se faire remarquer.',
    'Qu\'est-ce qui est petit, rond et qui fait "boom"? Une bulle explosive.',
    'Pourquoi les arbres dansent-ils? Pour attirer les oiseaux.',
    'Qu\'est-ce qui est grand, bleu et qui mange tout? Une baleine affamée.',
    'Pourquoi les vélos font-ils la sieste? Pour recharger leurs pneus.',
    'Qu\'est-ce qui est rouge et qui fait "pouet"? Une tomate clown.',
    'Pourquoi les poissons font-ils de la natation? Pour rester en forme.',
    'Qu\'est-ce qui est petit et qui fait "meuh"? Un petit veau perdu.',
    'Pourquoi les chaises dorment-elles debout? Parce qu\'elles n\'ont pas de lit.',
    'Qu\'est-ce qui est long et qui fait "pif"? Une baguette magicienne.',
    'Pourquoi les gorilles mangent-ils des bananes? Parce qu\'elles sont jaunes.',
    'Qu\'est-ce qui est petit, bleu et qui fait "bruit"? Un schtroumpf qui crie.',
    'Pourquoi les fantômes font-ils du sport? Pour rester invisibles.',
    'Qu\'est-ce qui est grand et qui mange des montagnes? Un géant glouton.',
    'Pourquoi les tables font-elles du yoga? Pour être stables.',
    'Qu\'est-ce qui est noir, blanc et qui fait "boom"? Un zèbre kamikaze.',
    'Pourquoi les chaussettes jouent-elles au foot? Pour marquer des buts.',
    'Qu\'est-ce qui est petit et qui fait "tic-tac"? Une montre à puce.',
    'Pourquoi les ampoules lisent-elles? Pour être plus brillantes.',
    'Qu\'est-ce qui est long, fin et qui fait "meuh"? Un fil vache.',
    'Pourquoi les portes font-elles du théâtre? Pour entrer en scène.',
    'Qu\'est-ce qui est petit, rond et qui fait "boom"? Une bille explosive.',
    'Pourquoi les arbres mangent-ils? Pour grandir.',
    'Qu\'est-ce qui est grand, bleu et qui fait "vroum"? Une baleine en voiture.',
    'Pourquoi les vélos mangent-ils de l\'huile? Pour aller plus vite.',
    'Qu\'est-ce qui est rouge et qui fait "bruit"? Une fraise en colère.',
    'Pourquoi les poissons lisent-ils? Pour apprendre à nager.',
    'Qu\'est-ce qui est petit et qui fait "meuh"? Une fourmi vache.',
    'Pourquoi les chaises dansent-elles? Pour faire du bruit.',
    'Qu\'est-ce qui est long et qui fait "paf"? Une saucisse gifleuse.',
    'Pourquoi les gorilles lisent-ils? Pour être plus intelligents.',
    'Qu\'est-ce qui est petit, bleu et qui fait "bruit"? Une petite goutte d\'eau.',
    'Pourquoi les fantômes font-ils du yoga? Pour s\'étirer.',
    'Qu\'est-ce qui est grand et qui mange des nuages? Un monstre céleste.',
    'Pourquoi les tables font-elles la sieste? Pour ne pas bouger.',
    'Qu\'est-ce qui est noir, blanc et qui fait "boom"? Une vache kamikaze.',
    'Pourquoi les chaussettes dorment-elles? Pour ne pas sentir les pieds.',
    'Qu\'est-ce qui est petit et qui fait "tic-tac"? Une souris horlogère.',
    'Pourquoi les ampoules dorment-elles? Pour ne pas briller.',
    'Qu\'est-ce qui est long, fin et qui fait "meuh"? Une ligne vache.',
    'Pourquoi les portes font-elles du sport? Pour rester fortes.',
    'Qu\'est-ce qui est petit, rond et qui fait "boom"? Un grain de raisin explosif.',
    'Pourquoi les arbres dorment-ils? Parce qu\'ils sont fatigués.',
    'Qu\'est-ce qui est grand, bleu et qui fait "bruit"? Un schtroumpf géant.',
    'Pourquoi les vélos font-ils du sport? Pour être légers.',
    'Qu\'est-ce qui est rouge et qui fait "pouet"? Un poivron clown.',
    'Pourquoi les poissons dorment-ils? Pour rêver d\'eau.',
    'Qu\'est-ce qui est petit et qui fait "meuh"? Un petit veau qui rigole.',
    'Pourquoi les chaises jouent-elles? Pour faire passer le temps.',
    'Qu\'est-ce qui est long et qui fait "pouf"? Une saucisse légère.',
    'Pourquoi les gorilles font-ils du yoga? Pour s\'assouplir.',
    'Qu\'est-ce qui est petit, bleu et qui fait "bruit"? Un petit oiseau schtroumpf.',
    'Pourquoi les fantômes mangent-ils? Pour devenir grands.',
    'Qu\'est-ce qui est grand et qui mange tout? Un trou noir affamé.',
    'Pourquoi les tables font-elles du théâtre? Pour être au centre.'
  ]
};

    const DEFAULT_JOKES_DE = {
  trocadilhos: [
    'Was ist grün und klopft an die Tür? Ein Klopfsalat.',
    'Was ist braun und sitzt im Wald? Ein Bär-liner.',
    'Welcher Vogel kann nicht fliegen? Der Flug-unfähige.',
    'Was ist gelb und kann schießen? Eine Banone.',
    'Warum sind Geister so schlechte Lügner? Weil man durch sie hindurchsehen kann.',
    'Was ist orange und wandert? Eine Wander-arine.',
    'Was ist rot und steht am Straßenrand? Eine Hagen-utte.',
    'Welches Brot kann man nicht essen? Ein Flach-brot.',
    'Was macht ein Keks am Strand? Krümeln.',
    'Was ist weiß und stört beim Essen? Eine Lawine.',
    'Was ist schwarz und sehr schnell? Ein Formel-1-Schornsteinfeger.',
    'Welches Tier ist am schlausten? Der Klug-fuchs.',
    'Was ist das Gegenteil von Reformhaus? Reh hinterm Haus.',
    'Was sagt ein Gen zum anderen? Du bist mir in den Genen.',
    'Was ist flach und stinkt? Ein Flach-witz.',
    'Was ist gelb und hüpft von Ast zu Ast? Eine Spring-Zitrone.',
    'Was ist klein, grün und dreieckig? Ein kleines grünes Dreieck.',
    'Warum gehen Bienen zum Friseur? Weil sie ihren Honig-Schnitt brauchen.',
    'Was ist ein Keks unter einem Baum? Ein schattiges Plätzchen.',
    'Welches Instrument spielt man in der Küche? Die Pfannen-flöte.',
    'Was ist das Lieblingsessen von Piraten? Enter-braten.',
    'Was ist klein und schwarz und klopft an die Tür? Ein Klopf-käfer.',
    'Was ist rot und schlecht für die Zähne? Ein Ziegelstein.',
    'Was ist gelb und trägt ein Kleid? Eine Banan-ina.',
    'Welches Auto fährt am langsamsten? Der Schnecken-Benz.',
    'Was ist grün und glücklich? Eine Glücks-gurke.',
    'Was ist braun, klebrig und läuft durch den Wald? Ein Klebr-bär.',
    'Was ist klein, rund und macht Spaß? Ein Spaß-punkt.',
    'Welcher Fisch spielt am besten Gitarre? Der Bass-Fisch.',
    'Was ist ein Skelett im Schrank? Ein Langzeit-Gast.',
    'Was ist grün und flitzt durch den Garten? Eine Renn-gurke.',
    'Was ist rot und spielt Gitarre? Eine Rock-Tomate.',
    'Was ist gelb und schwimmt im Meer? Ein U-Boot-Banane.',
    'Was ist klein, süß und rennt schnell? Ein Renn-Gummibärchen.',
    'Was ist weiß und fliegt? Eine Schnee-Eule.',
    'Was ist braun und schießt? Ein Schoko-Gewehr.',
    'Welcher Baum steht im Bett? Ein Schlaf-baum.',
    'Was ist ein Hund mit einem Flammenwerfer? Ein heißer Hund.',
    'Was ist grün und wird auf Knopfdruck rot? Ein Frosch im Mixer.',
    'Was ist gelb und kann nicht schwimmen? Ein Bagger.',
    'Was ist braun und läuft durch den Wüstensand? Ein Kamel mit Sonnenbrand.',
    'Was ist klein, rot und macht Musik? Ein Marienkäfer mit Geige.',
    'Was ist weiß und schläft im Wald? Ein Schlaf-Schneemann.',
    'Welcher Apfel kann nicht essen? Der Plastik-Apfel.',
    'Was ist gelb und hat zwei Arme? Eine Ananas mit Muskeln.',
    'Was ist grün und schießt? Eine Erbsen-Kanone.',
    'Was ist braun und sitzt auf dem Baum? Ein Schoko-Vogel.',
    'Was ist klein, blau und macht "wuff"? Ein Schlumpf-Hund.',
    'Was ist weiß und hat zwei Beine? Ein Schnee-Huhn.',
    'Was ist gelb und sehr schlau? Eine Klug-Banane.',
    'Was ist braun und flitzt? Ein Renn-Biber.',
    'Was ist klein, rund und schießt? Eine Erbsen-Pistole.',
    'Was ist grün und tanzt? Eine Tanz-Gurke.',
    'Was ist rot und rennt? Eine Renn-Tomate.',
    'Was ist weiß und kann nicht fliegen? Ein Pinguin im Schnee.',
    'Was ist gelb und singt? Eine Sing-Zitrone.',
    'Was ist braun und schläft? Ein Schlaf-Bär.',
    'Was ist klein, schwarz und rennt? Eine Renn-Ameise.',
    'Was ist grün und macht Spaß? Ein Spaß-Frosch.',
    'Was ist rot und spielt Fußball? Ein Fußball-Apfel.',
    'Was ist weiß und schießt? Eine Schnee-Pistole.',
    'Was ist gelb und hüpft? Ein Spring-Ei.',
    'Was ist braun und spielt Musik? Ein Gitarren-Biber.',
    'Was ist klein, rund und singt? Ein Sing-Knopf.',
    'Was ist grün und rennt? Eine Renn-Erbse.',
    'Was ist rot und schläft? Eine Schlaf-Kirsche.',
    'Was ist weiß und singt? Ein Schnee-Chor.',
    'Was ist gelb und macht "wuff"? Ein Hunde-Banane.',
    'Was ist braun und hüpft? Ein Spring-Biber.',
    'Was ist klein, rund und spielt Fußball? Ein Fußball-Keks.',
    'Was ist grün und spielt Fußball? Ein Fußball-Frosch.',
    'Was ist rot und tanzt? Eine Tanz-Tomate.',
    'Was ist weiß und hüpft? Ein Spring-Schnee.',
    'Was ist gelb und schläft? Ein Schlaf-Ei.',
    'Was ist braun und rennt? Ein Renn-Bär.'
  ],
  tiozao: [
    'Was ist ein Keks unter einem Baum? Ein schattiges Plätzchen.',
    'Warum können Skelette schlecht lügen? Weil sie so leicht zu durchschauen sind.',
    'Was ist gelb und kann nicht schwimmen? Ein Bagger.',
    'Treffen sich zwei Fische. Sagt der eine: "Hallo!" Sagt der andere: "Wo?"',
    'Was ist grün und trägt ein Gewehr? Eine Erbsenpistole.',
    'Warum gehen Ameisen nicht in die Kirche? Weil sie in Ableger gehen.',
    'Was ist weiß und stört beim Essen? Eine Lawine.',
    'Was macht ein Clown im Büro? Faxen.',
    'Was ist braun und sitzt im Wald? Ein Bär-liner.',
    'Warum sind Polizisten so gute Musiker? Weil sie immer den Ton angeben.',
    'Was ist gelb und kann schießen? Eine Banone.',
    'Was ist der Unterschied zwischen einem Fahrrad und einem Brot? Das Fahrrad hat keinen Ofen.',
    'Warum schwimmen Fische in Salzwasser? Weil Pfeffer sie zum Niesen bringt.',
    'Was ist ein Hund mit einem Flammenwerfer? Ein heißer Hund.',
    'Warum gehen Bienen im Sommer in den Urlaub? Weil sie mal Honig-Pause brauchen.',
    'Was ist grün und glücklich? Eine Glücks-gurke.',
    'Was macht eine Katze in der Disco? Sie tanzt den Miezen-Tanz.',
    'Was ist rot und steht am Straßenrand? Eine Hagen-utte.',
    'Warum können Vögel fliegen? Weil sie Flügel haben.',
    'Was ist klein, schwarz und klopft an die Tür? Ein Klopf-käfer.',
    'Was ist das Lieblingsessen von Piraten? Enter-braten.',
    'Was ist ein Skelett im Schrank? Ein Langzeit-Gast.',
    'Was ist gelb und trägt ein Kleid? Eine Banan-ina.',
    'Warum haben Fische keine Arme? Weil sie keine Hände zum Flossen-Winken brauchen.',
    'Was ist weiß und fliegt? Eine Schnee-Eule.',
    'Was ist grün und wird auf Knopfdruck rot? Ein Frosch im Mixer.',
    'Was ist braun, klebrig und läuft durch den Wald? Ein Klebr-bär.',
    'Was macht ein Keks am Strand? Krümeln.',
    'Warum ist die Banane krumm? Weil niemand in den Wald ging.',
    'Was ist rot und spielt Gitarre? Eine Rock-Tomate.',
    'Was ist weiß und schläft im Wald? Ein Schlaf-Schneemann.',
    'Was ist klein, süß und rennt schnell? Ein Renn-Gummibärchen.',
    'Was ist gelb und schwimmt im Meer? Ein U-Boot-Banane.',
    'Was ist ein Hund, der kein Wort sagt? Ein stiller Beller.',
    'Was ist grün und flitzt durch den Garten? Eine Renn-gurke.',
    'Was ist klein, rund und macht Spaß? Ein Spaß-punkt.',
    'Was ist braun und schießt? Ein Schoko-Gewehr.',
    'Was ist klein, blau und macht "wuff"? Ein Schlumpf-Hund.',
    'Was ist gelb und sehr schlau? Eine Klug-Banane.',
    'Was ist braun und flitzt? Ein Renn-Biber.',
    'Was ist klein, rund und schießt? Eine Erbsen-Pistole.',
    'Was ist grün und tanzt? Eine Tanz-Gurke.',
    'Was ist rot und rennt? Eine Renn-Tomate.',
    'Was ist weiß und kann nicht fliegen? Ein Pinguin im Schnee.',
    'Was ist gelb und singt? Eine Sing-Zitrone.',
    'Was ist braun und schläft? Ein Schlaf-Bär.',
    'Was ist klein, schwarz und rennt? Eine Renn-Ameise.',
    'Was ist grün und macht Spaß? Ein Spaß-Frosch.',
    'Was ist rot und spielt Fußball? Ein Fußball-Apfel.',
    'Was ist weiß und schießt? Eine Schnee-Pistole.',
    'Was ist gelb und hüpft? Ein Spring-Ei.',
    'Was ist braun und spielt Musik? Ein Gitarren-Biber.',
    'Was ist klein, rund und singt? Ein Sing-Knopf.',
    'Was ist grün und rennt? Eine Renn-Erbse.',
    'Was ist rot und schläft? Eine Schlaf-Kirsche.',
    'Was ist weiß und singt? Ein Schnee-Chor.',
    'Was ist gelb und macht "wuff"? Ein Hunde-Banane.',
    'Was ist braun und hüpft? Ein Spring-Biber.',
    'Was ist klein, rund und spielt Fußball? Ein Fußball-Keks.',
    'Was ist grün und spielt Fußball? Ein Fußball-Frosch.',
    'Was ist rot und tanzt? Eine Tanz-Tomate.',
    'Was ist weiß und hüpft? Ein Spring-Schnee.',
    'Was ist gelb und schläft? Ein Schlaf-Ei.',
    'Was ist braun und rennt? Ein Renn-Bär.',
    'Was ist klein, schwarz und tanzt? Ein Tanz-Käfer.',
    'Was ist grün und singt? Ein Sing-Frosch.',
    'Was ist rot und hüpft? Ein Spring-Apfel.',
    'Was ist weiß und rennt? Ein Renn-Schnee.',
    'Was ist gelb und tanzt? Eine Tanz-Zitrone.',
    'Was ist braun und singt? Ein Sing-Bär.',
    'Was ist klein, schwarz und schläft? Ein Schlaf-Käfer.',
    'Was ist grün und schläft? Ein Schlaf-Frosch.',
    'Was ist rot und rennt? Ein Renn-Apfel.',
    'Was ist weiß und tanzt? Ein Tanz-Schnee.',
    'Was ist gelb und rennt? Eine Renn-Zitrone.'
  ],
  cotidiano: [
    'Ich habe heute versucht, normal zu sein. Die schlimmsten fünf Minuten meines Lebens.',
    'Mein Schreibtisch ist kein Chaos, das ist ein kreatives Ablagesystem.',
    'Ich brauche keinen Google-Assistenten, meine Frau weiß sowieso alles.',
    'Mein Leben ist wie eine Pizza: ein bisschen fettig, aber gut.',
    'Ich wollte heute joggen gehen, aber mein Sofa hat mich festgehalten.',
    'Mein Auto ist nicht langsam, es ist im Ruhemodus.',
    'Ich bin nicht faul, ich bin im Energiesparmodus.',
    'Mein Kaffee ist mein einziger bester Freund am Morgen.',
    'Ich habe eine App, die sagt, wann ich schlafen gehen soll. Ich ignoriere sie.',
    'Mein Kühlschrank ist mein treuester Begleiter in einsamen Nächten.',
    'Ich habe heute ein Buch gelesen. Naja, ich habe das Cover angesehen.',
    'Mein Tagesablauf: Kaffee, Arbeit, Essen, Schlafen, Wiederholen.',
    'Ich wollte die Welt retten, aber es hat angefangen zu regnen.',
    'Mein Geldbeutel ist wie eine Zwiebel: Wenn ich ihn öffne, muss ich weinen.',
    'Ich habe mein Passwort vergessen und mein "Ich habe mein Passwort vergessen"-Passwort auch.',
    'Mein Haus ist nicht unordentlich, es ist bewohnt.',
    'Ich habe heute so viel gearbeitet, dass ich eine Pause von meiner Pause brauchte.',
    'Mein Sportprogramm: Ich hebe meine Kaffeetasse 50 Mal am Tag.',
    'Ich wollte aufräumen, aber dann habe ich ein interessantes Video gefunden.',
    'Mein Wecker ist mein größter Feind.',
    'Ich habe heute mein Ziel erreicht: Ich habe nichts getan.',
    'Mein Gehirn hat zu viele Tabs geöffnet.',
    'Ich bin nicht unordentlich, ich finde nur alles sofort.',
    'Mein Internet ist langsamer als eine Schnecke mit Krücken.',
    'Ich habe heute so viel gelernt: Wie man die Zeit vertrödelt.',
    'Mein Handy ist meine Lebensversicherung.',
    'Ich habe heute so viele E-Mails bekommen. Ich habe alle gelöscht.',
    'Mein Leben ist eine Aneinanderreihung von "Hoppla"-Momenten.',
    'Ich bin der König des Prokrastinierens.',
    'Mein Kochstil: "Ist es essbar?"',
    'Ich wollte fit werden, aber Schokolade war im Weg.',
    'Mein Schlafmangel ist meine neue Persönlichkeit.',
    'Ich habe heute so viele Pläne gemacht. Keinen davon habe ich umgesetzt.',
    'Mein Schreibtisch sieht aus wie eine Bibliothek, die explodiert ist.',
    'Ich bin ein Meister der Ausreden.',
    'Mein Kalender ist voll mit "Nichts tun".',
    'Ich habe heute so viel gelacht. Über mich selbst.',
    'Mein größtes Talent: Den richtigen Moment für den richtigen Spruch verpassen.',
    'Ich bin nicht vergesslich, ich bin selektiv.',
    'Mein Leben ist ein Abenteuer. Ein sehr langweiliges Abenteuer.',
    'Ich habe heute ein kompliziertes Problem gelöst: Den Fernseher angemacht.',
    'Mein Hund ist der Einzige, der mich wirklich versteht.',
    'Ich bin ein Profi im Kaffeekochen.',
    'Mein Leben ist wie ein Film, aber ohne Budget.',
    'Ich habe heute so viele wichtige Dinge erledigt. Im Traum.',
    'Mein Auto braucht mehr Pflege als mein Partner.',
    'Ich bin ein Experte im Zeitverschwenden.',
    'Mein Kleiderschrank ist eine Zeitkapsel.',
    'Ich habe heute so viele kluge Dinge gedacht. Alle vergessen.',
    'Mein Lieblingsplatz ist mein Bett.',
    'Ich bin ein Fan von "später".',
    'Mein Leben braucht ein Update.',
    'Ich habe heute so viele Menschen getroffen. Online.',
    'Mein Erfolg kommt bald. Sehr bald.',
    'Ich bin ein Spezialist für komplizierte einfache Dinge.',
    'Mein Weg zur Arbeit: Ein tägliches Abenteuer.',
    'Ich habe heute so viel gearbeitet. Im Kopf.',
    'Mein Kühlschrank ist ein Spiegelbild meiner Seele.',
    'Ich bin ein leidenschaftlicher Nichts-Tuer.',
    'Mein Schlafrhythmus ist ein Rätsel.',
    'Ich habe heute mein bestes gegeben. Es war nicht viel.',
    'Mein Smartphone ist mein dritter Arm.',
    'Ich bin der Anführer meiner eigenen Faulheit.',
    'Mein Tag war ein Erfolg: Ich bin aufgewacht.',
    'Ich habe heute so viel gelernt. Über meine Faulheit.',
    'Mein Leben ist ein Prozess. Ein sehr langsamer Prozess.',
    'Ich bin ein Profi im Lächeln, wenn ich keine Lust habe.',
    'Mein Auto ist mein zweites Zuhause.',
    'Ich habe heute so viele Fehler gemacht. Alle mit Stil.',
    'Mein Alltag ist eine Kunstform.',
    'Ich bin der beste im "Noch 5 Minuten".',
    'Mein Ziel für heute: Überleben.',
    'Ich habe heute so viel Zeit verbracht. Mit Nichts.',
    'Mein Leben ist ein Zirkus ohne Eintritt.',
    'Ich bin der CEO meiner eigenen Welt.'
  ],
  familia: [
    'Mein Sohn fragt mich: "Papa, warum bist du so alt?" Ich antworte: "Weil ich zu lange gewartet habe."',
    'Meine Frau sagt: "Du hörst mir nie zu!" Ich: "Ja, genau das meine ich."',
    'Mein Vater sagt immer: "In meinem Alter war ich schon fertig!"',
    'Meine Mutter meint, ich sehe immer aus wie ein verwahrloster Künstler.',
    'Mein Bruder denkt, er ist der coolste, dabei ist er nur der lauteste.',
    'Unsere Familienfeste sind wie eine Reality-Show.',
    'Meine Schwester leiht sich meine Kleidung und fragt, warum ich sie nicht finde.',
    'Mein Opa erzählt immer die gleiche Geschichte von früher.',
    'Unsere Katze hat in unserer Familie das Sagen.',
    'Mein Vater versucht immer, Dinge zu reparieren, und macht sie kaputt.',
    'Meine Mutter hat ein Radar für Unordnung.',
    'Mein Bruder und ich streiten uns um das letzte Stück Pizza.',
    'Mein Opa schläft immer beim Fernsehen ein.',
    'Meine Familie ist wie ein bunter Haufen Chaoten.',
    'Mein Vater gibt mir Ratschläge, die ich nie gefragt habe.',
    'Meine Mutter fragt mich immer, ob ich einen Freund habe.',
    'Mein Bruder hält sich für den nächsten Internet-Star.',
    'Unsere Urlaube sind immer eine Katastrophe.',
    'Mein Opa hat immer ein Bonbon für mich.',
    'Meine Familie ist verrückt, aber sie sind meine Verrückten.',
    'Mein Vater denkt, er weiß alles über Technik.',
    'Meine Mutter schickt mir jeden Tag "Guten Morgen"-Bilder.',
    'Mein Bruder ist mein bester Freund und mein größter Feind.',
    'Unsere Familienfotos sind immer peinlich.',
    'Mein Opa erzählt Witze, über die nur er lacht.',
    'Mein Vater arbeitet an Projekten, die Jahre dauern.',
    'Meine Mutter ist eine Meisterin im Kochen für eine Armee.',
    'Mein Bruder leiht sich Geld und vergisst es zurückzuzahlen.',
    'Unsere Familienmitglieder sind wie Puzzleteile, die nicht passen.',
    'Mein Opa liest immer die Zeitung von gestern.',
    'Mein Vater denkt, er ist ein Comedy-Star.',
    'Meine Mutter fragt mich, warum ich nicht mehr nach Hause komme.',
    'Mein Bruder hält sich für einen Fitness-Guru.',
    'Unsere Familienabende enden immer in einer Diskussion.',
    'Mein Opa liebt seinen Garten mehr als uns.',
    'Mein Vater versucht, modern zu sein, und scheitert.',
    'Meine Mutter hat immer eine Lösung für jedes Problem.',
    'Mein Bruder hält sich für den Boss.',
    'Unsere Familienbande sind stark, aber nervig.',
    'Mein Opa schläft in jedem Sessel.',
    'Mein Vater denkt, er ist ein Automechaniker.',
    'Meine Mutter hat immer die besten Backrezepte.',
    'Mein Bruder hält sich für einen Modedesigner.',
    'Unsere Familienessen dauern ewig.',
    'Mein Opa vergisst immer meinen Namen.',
    'Mein Vater denkt, er ist ein Grillmeister.',
    'Meine Mutter sorgt sich immer um alles.',
    'Mein Bruder hält sich für einen DJ.',
    'Unsere Familienausflüge sind wie ein Abenteuerfilm.',
    'Mein Opa ist ein wandelndes Lexikon.',
    'Mein Vater versucht, sparsam zu sein, und kauft Schrott.',
    'Meine Mutter ist das Herz der Familie.',
    'Mein Bruder hält sich für einen Abenteurer.',
    'Unsere Familiendiskussionen sind legendär.',
    'Mein Opa liebt seine alten Geschichten.',
    'Mein Vater denkt, er ist ein Handwerker.',
    'Meine Mutter ist immer für mich da.',
    'Mein Bruder hält sich für einen Sportler.',
    'Unsere Familienfeiern sind laut.',
    'Mein Opa ist ein wahrer Klassiker.',
    'Mein Vater denkt, er ist ein Mentor.',
    'Meine Mutter ist die beste Köchin.',
    'Mein Bruder hält sich für einen Künstler.',
    'Unsere Familienbindung ist einzigartig.',
    'Mein Opa ist immer gut gelaunt.',
    'Mein Vater denkt, er ist ein Lehrer.',
    'Meine Mutter ist immer geduldig.',
    'Mein Bruder hält sich für einen Entdecker.',
    'Unsere Familiengeschichte ist lang.',
    'Mein Opa ist eine Legende.',
    'Mein Vater denkt, er ist ein Profi.',
    'Meine Mutter ist immer hilfsbereit.',
    'Mein Bruder hält sich für einen Visionär.',
    'Unsere Familienliebe ist unendlich.',
    'Mein Opa ist der Beste.'
  ],
  escola_trabalho: [
    'Mein Job ist wie eine Achterbahn: meistens geht es abwärts.',
    'Die Konferenz könnte eine E-Mail sein, aber das würde den Spaß ruinieren.',
    'Mein Chef denkt, ich bin ein Roboter. Ich bin nur ein müder Mensch.',
    'Ich habe heute so viel gearbeitet: Ich habe meine Kaffeetasse gewechselt.',
    'Die Deadlines sind wie Luftballons: Sie platzen immer.',
    'Mein Büro ist meine zweite Heimat. Ich hasse meine zweite Heimat.',
    'Ich habe heute ein wichtiges Meeting verpasst. Absichtlich.',
    'Mein Kollege erklärt mir Dinge, die ich schon zehnmal gehört habe.',
    'Die Arbeit ist wie ein Puzzle: Ich habe die falschen Teile.',
    'Mein Computer arbeitet langsamer als ich am Montagmorgen.',
    'Ich bin ein Experte im "Ich höre zu, während ich träume".',
    'Mein Chef hat eine neue Vision: "Arbeitet mehr für weniger Geld".',
    'Die Mittagspause ist der einzige Grund, warum ich zur Arbeit gehe.',
    'Mein Arbeitsalltag besteht aus Problemen, die ich nicht verursacht habe.',
    'Die Schule war eine Vorbereitung auf den Stress im Job.',
    'Ich habe heute mein Bestes gegeben: Ich habe nicht gekündigt.',
    'Mein Schreibtisch ist ein Schlachtfeld.',
    'Die Präsentation ist wie ein Horrorfilm: Alle haben Angst.',
    'Ich bin ein Profi im Tab-Wechseln, wenn der Chef kommt.',
    'Mein Job ist es, Lösungen für Probleme zu finden, die niemand hat.',
    'Die Büro-Politik ist wie ein Dschungel.',
    'Ich habe heute ein neues Wort gelernt: "Dienst nach Vorschrift".',
    'Mein Chef denkt, ich bin immer erreichbar. Er irrt sich.',
    'Die Arbeit ist ein Marathon ohne Ziel.',
    'Ich bin ein Meister der Büro-Ausreden.',
    'Mein Computer hat ein Eigenleben.',
    'Die E-Mails sind wie Spam, nur von Kollegen.',
    'Ich habe heute so viel Zeit mit Nichtstun verbracht.',
    'Mein Job ist eine Herausforderung für meine Nerven.',
    'Die Arbeit macht Spaß, wenn man nicht da ist.',
    'Ich bin ein Experte für Kaffeemaschinen-Wartung.',
    'Mein Chef fragt immer: "Wann ist es fertig?"',
    'Die Schule war besser, weil es Ferien gab.',
    'Mein Büro ist eine Insel der Einsamkeit.',
    'Ich habe heute so viele Aufgaben delegiert. An mich selbst.',
    'Die Arbeit ist eine ständige Suche nach Motivation.',
    'Mein Kollege weiß alles besser.',
    'Die Konferenzen sind eine Übung in Geduld.',
    'Ich bin ein Spezialist für die "Ich weiß es nicht"-Antwort.',
    'Mein Chef hat immer neue, tolle Ideen.',
    'Die Arbeit ist ein ständiger Kampf gegen die Uhr.',
    'Ich habe heute mein Potenzial voll ausgeschöpft. Im Schlafen.',
    'Mein Arbeitsplatz ist mein zweites Zuhause. Leider.',
    'Die Schule war nur der Anfang vom Ende.',
    'Ich bin ein Profi im Lächeln, wenn ich innerlich schreie.',
    'Mein Chef denkt, ich bin ein Multitalent.',
    'Die Arbeit ist ein endloser Kreis von Aufgaben.',
    'Ich habe heute so viele Notizen gemacht. Alle sinnlos.',
    'Mein Job ist eine Achterbahnfahrt.',
    'Die Büro-Kultur ist ein Rätsel.',
    'Ich bin ein Experte im "Das mache ich gleich".',
    'Mein Chef hat keine Ahnung von Arbeit.',
    'Die Arbeit ist ein Ort für Träume. Vor allem Tagträume.',
    'Ich habe heute so viele Fehler gemacht. Alle unbemerkt.',
    'Mein Schreibtisch ist ein Ort der Ordnungslosigkeit.',
    'Die Arbeit macht müde.',
    'Mein Kollege ist ein Plappermäulchen.',
    'Die Arbeit ist eine Prüfung.',
    'Ich bin ein Meister des Büro-Stillschweigens.',
    'Mein Chef ist eine Inspiration. Ein Beispiel, wie man es nicht macht.',
    'Die Arbeit ist eine Pflicht.',
    'Ich habe heute so viel erledigt. Fast gar nichts.',
    'Mein Arbeitsstil: Chaotisch.',
    'Die Arbeit ist ein Abenteuer.',
    'Ich bin ein Fan von Feierabend.',
    'Mein Chef ist ein Genie. In seinem Kopf.',
    'Die Arbeit ist eine Konstante.',
    'Ich habe heute ein Ziel: Den Feierabend.',
    'Mein Arbeitsleben ist ein Witz.',
    'Die Arbeit ist ein Teil des Lebens.',
    'Ich bin ein Profi im Überleben.',
    'Mein Chef hat keine Vorstellung von Arbeit.',
    'Die Arbeit ist ein Training.',
    'Ich habe heute so viel gelernt. Wie man überlebt.',
    'Mein Job ist mein Alltag.'
  ],
  absurdo: [
    'Warum hat das Telefon keine Lust mehr? Weil es immer nur abgehoben wird.',
    'Was ist ein Hund, der die Zeit ansagt? Ein Uhr-Hund.',
    'Warum hat das Brot keinen Freund? Weil es ein Einzelgänger ist.',
    'Was macht ein Clown im Wasser? Er macht Faxen mit Fischen.',
    'Warum trägt das Huhn eine Brille? Weil es keine Lust auf Augenoptiker hat.',
    'Was ist eine Katze, die im Regen tanzt? Eine Klatschnasse.',
    'Warum geht die Sonne zur Schule? Um sich aufzuhellen.',
    'Was ist grün und schießt? Ein Erbsen-Gewehr.',
    'Warum hat das Auto keine Schuhe? Weil es Reifen hat.',
    'Was ist ein Hund, der singt? Ein Beller-Star.',
    'Warum geht die Uhr falsch? Weil sie zu viel Zeit hat.',
    'Was ist rot und rennt durch die Küche? Eine Tomate auf der Flucht.',
    'Warum hat das Buch keine Beine? Weil es ein Buch ist.',
    'Was ist klein, blau und macht "wuff"? Ein Schlumpf-Hund.',
    'Warum ist der Fisch so schlau? Weil er in der Schule ist.',
    'Was ist ein Skelett, das tanzt? Ein Rippen-Star.',
    'Warum trägt der Baum keine Hose? Weil er Wurzeln hat.',
    'Was ist grün und hüpft? Ein Spring-Frosch.',
    'Warum hat der Stuhl keine Lust zum Reden? Weil er ein Sitzmöbel ist.',
    'Was ist gelb und kann nicht fliegen? Eine Banane im Flugzeug.',
    'Warum geht das Licht zur Schule? Um schlauer zu werden.',
    'Was ist ein Skelett, das Musik macht? Ein Knochen-Künstler.',
    'Warum trägt der Pinguin keinen Anzug? Er hat schon einen.',
    'Was ist klein, rund und rollt? Ein runder Punkt.',
    'Warum ist die Gurke so glücklich? Weil sie eine Glücks-Gurke ist.',
    'Was ist ein Hund, der spielt? Ein Spiel-Hund.',
    'Warum hat das Brot keine Füße? Weil es Krusten hat.',
    'Was ist gelb und spielt Fußball? Ein Fußball-Ei.',
    'Warum trägt der Apfel eine Brille? Um besser zu sehen.',
    'Was ist eine Katze, die spielt? Ein Spiel-Kätzchen.',
    'Warum hat die Sonne keine Beine? Weil sie strahlt.',
    'Was ist grün und flitzt? Eine Renn-Gurke.',
    'Warum geht der Computer zur Schule? Um zu rechnen.',
    'Was ist klein, blau und macht "miauh"? Ein Schlumpf-Kater.',
    'Warum hat das Skelett keine Lust zum Arbeiten? Weil es keine Muskeln hat.',
    'Was ist eine Tomate, die rennt? Eine Renn-Tomate.',
    'Warum trägt der Baum keine Brille? Weil er Blätter hat.',
    'Was ist ein Hund, der tanzt? Ein Tanz-Hund.',
    'Warum hat der Stuhl keine Arme? Weil er Beine hat.',
    'Was ist gelb und singt? Eine Sing-Banane.',
    'Warum geht die Uhr zum Sport? Um die Zeit zu stoppen.',
    'Was ist eine Katze, die schläft? Eine Schlaf-Katze.',
    'Warum hat das Buch keinen Freund? Weil es Seiten hat.',
    'Was ist klein, blau und macht "wuff"? Ein blauer Hund.',
    'Warum ist der Fisch so glücklich? Weil er im Wasser ist.',
    'Was ist ein Skelett, das singt? Ein Knochen-Sänger.',
    'Warum trägt der Pinguin einen Hut? Weil er cool ist.',
    'Was ist grün und rennt? Eine Renn-Erbse.',
    'Warum geht das Licht schlafen? Um Energie zu sparen.',
    'Was ist gelb und spielt Musik? Eine Musik-Banane.',
    'Warum hat die Sonne keine Lust? Weil sie immer scheint.',
    'Was ist eine Katze, die spielt? Eine Spiel-Katze.',
    'Warum hat das Brot keine Lust? Weil es alt ist.',
    'Was ist klein, blau und macht "miauh"? Ein kleiner Kater.',
    'Warum ist der Fisch so schlau? Weil er im Meer schwimmt.',
    'Was ist ein Skelett, das tanzt? Ein Tanz-Skelett.',
    'Warum trägt der Baum keine Mütze? Weil er Zweige hat.',
    'Was ist grün und spielt Fußball? Ein Fußball-Frosch.',
    'Warum geht der Computer schlafen? Weil er aus ist.',
    'Was ist gelb und rennt? Eine Renn-Zitrone.',
    'Warum hat die Uhr keine Lust? Weil sie tickt.',
    'Was ist eine Katze, die singt? Eine Sing-Katze.',
    'Warum hat das Buch keine Beine? Weil es Seiten hat.',
    'Was ist klein, blau und macht "wuff"? Ein kleiner Schlumpf-Hund.',
    'Warum ist der Fisch so lustig? Weil er Blasen macht.',
    'Was ist ein Skelett, das schläft? Ein Schlaf-Skelett.',
    'Warum trägt der Pinguin keine Hose? Weil er Federn hat.',
    'Was ist grün und schläft? Ein Schlaf-Frosch.',
    'Warum geht das Licht aus? Weil es dunkel ist.',
    'Was ist gelb und tanzt? Eine Tanz-Zitrone.',
    'Warum hat die Uhr keine Lust zum Arbeiten? Weil sie müde ist.',
    'Was ist eine Katze, die rennt? Eine Renn-Katze.',
    'Warum hat das Brot keine Lust zum Essen? Weil es alt ist.',
    'Was ist klein, blau und macht "miauh"? Ein Schlumpf-Kätzchen.',
    'Warum ist der Fisch so froh? Weil er im Wasser lebt.'
  ]
}; 
    
    const DEFAULT_JOKES_IT = {
  trocadilhos: [
    'Qual è il colmo per un giardiniere? Non capire un cavolo.',
    'Cosa fa un cane che fa il tifo? Il cane-tante.',
    'Qual è il colmo per un sarto? Avere una vita appesa a un filo.',
    'Cosa dice un muro all\'altro? Ci vediamo all\'angolo.',
    'Qual è il colmo per un matematico? Non fare mai i conti con la realtà.',
    'Cosa fa un pomodoro in un frigo? Rosso di vergogna.',
    'Qual è il colmo per un idraulico? Non saper chiudere il rubinetto.',
    'Cosa dice un libro di matematica a un altro? Ho troppi problemi.',
    'Qual è il colmo per un postino? Perdere la lettera di vettura.',
    'Cosa fa un\'ape in palestra? Zumba.',
    'Qual è il colmo per un barbiere? Avere i capelli dritti.',
    'Cosa dice un semaforo a un altro? Non guardarmi, mi sto cambiando.',
    'Qual è il colmo per un panettiere? Essere sempre nel panico.',
    'Cosa fa un mago a tavola? Magia dei sapori.',
    'Qual è il colmo per un elettricista? Non essere al corrente.',
    'Cosa dice una lampadina a un\'altra? Sei fulminante.',
    'Qual è il colmo per un vigile? Non avere polso.',
    'Cosa fa un orologio che ha fretta? Corre sempre.',
    'Qual è il colmo per un pescatore? Avere una vita da cani.',
    'Cosa dice una matita a un foglio? Ti lascio il segno.',
    'Qual è il colmo per un fotografo? Non essere sviluppato.',
    'Cosa fa una stella in un film? Brilla.',
    'Qual è il colmo per un chirurgo? Operarsi di simpatia.',
    'Cosa dice un cappello a un altro? Resta qui che vado a fare un giro.',
    'Qual è il colmo per un ornitologo? Non avere un nido.',
    'Cosa fa un computer sotto la pioggia? Si bagna il circuito.',
    'Qual è il colmo per un informatico? Avere un virus in testa.',
    'Cosa dice una scarpa a un\'altra? Facciamo un passo insieme.',
    'Qual è il colmo per un atleta? Correre verso il nulla.',
    'Cosa fa una porta in ufficio? Si apre a nuove idee.',
    'Qual è il colmo per un cuoco? Non avere sale in zucca.',
    'Cosa dice un guanto a un altro? Mettiamoci d\'accordo.',
    'Qual è il colmo per un avvocato? Perdere la causa persa.',
    'Cosa fa una moneta in banca? Risparmia.',
    'Qual è il colmo per un dentista? Avere i denti stretti.',
    'Cosa dice un occhiale a un altro? Ci vediamo bene.',
    'Qual è il colmo per un attore? Recitare la parte del mimo.',
    'Cosa fa un libro in biblioteca? Legge nel pensiero.',
    'Qual è il colmo per un naufrago? Non avere mai un\'isola felice.',
    'Cosa dice una tazza a un\'altra? Sei molto profonda.',
    'Qual è il colmo per un astronauta? Avere la testa tra le stelle.',
    'Cosa fa una chitarra in spiaggia? Suona il mare.',
    'Qual è il colmo per un falegname? Essere un tipo di legno.',
    'Cosa dice una pioggia a una nuvola? Mi sento giù.',
    'Qual è il colmo per un orologiaio? Non avere tempo per sé.',
    'Cosa fa una bottiglia in frigo? Si rinfresca le idee.',
    'Qual è il colmo per un giocoliere? Perdere il controllo.',
    'Cosa dice un ombrello a un altro? Apriamoci al mondo.',
    'Qual è il colmo per un vigile del fuoco? Non avere fuoco dentro.',
    'Cosa fa un treno in stazione? Aspetta il futuro.',
    'Qual è il colmo per un calciatore? Non avere campo.',
    'Cosa dice una forchetta a un cucchiaio? Sei troppo concavo.',
    'Qual è il colmo per un musicista? Non avere ritmo nelle vene.',
    'Cosa fa un tappeto in corridoio? Si fa calpestare.',
    'Qual è il colmo per un ladro? Essere rubato nel tempo.',
    'Cosa dice un telefono a un altro? Hai squillato.',
    'Qual è il colmo per un astronauta? Non avere aria.',
    'Cosa fa una candela in chiesa? Illumina il cammino.',
    'Qual è il colmo per un muratore? Avere una vita piatta.',
    'Cosa dice un cassetto a un altro? Chiudiamoci qui.',
    'Qual è il colmo per un meccanico? Non avere la marcia giusta.',
    'Cosa fa una radio in cucina? Trasmette sapori.',
    'Qual è il colmo per un pilota? Non avere volo.',
    'Cosa dice una bustina a una lettera? Sei tutta sigillata.',
    'Qual è il colmo per un sub? Essere all\'oscuro.',
    'Cosa fa un cuscino a letto? Sogna.',
    'Qual è il colmo per un pittore? Non avere colore.',
    'Cosa dice una matita a un temperino? Sei affilato.',
    'Qual è il colmo per un astronomo? Avere la luna storta.',
    'Cosa fa un pennello sul foglio? Crea.',
    'Qual è il colmo per un pasticcere? Non avere dolcezza.',
    'Cosa dice un righello a una gomma? Tu cancelli, io misuro.',
    'Qual è il colmo per un pescatore? Prendere un granchio.',
    'Cosa fa una lampada al buio? Si accende.',
    'Qual è il colmo per un sarto? Non avere stoffa.'
  ],
  tiozao: [
    'Sai perché il mare è salato? Perché i pesci non si lavano.',
    'Cosa dice un chicco di caffè all\'altro? Mi sento un po\' giù.',
    'Qual è il colmo per un cane? Avere una vita da gatti.',
    'Perché i fantasmi sono pessimi bugiardi? Perché si vede che sono trasparenti.',
    'Sai cosa dice un muro a un altro muro? Ci vediamo all\'angolo.',
    'Cosa fa un cane in chiesa? Prega per un osso.',
    'Qual è il colmo per un idraulico? Avere le tubature in pappa.',
    'Perché il libro di matematica è sempre triste? Perché ha troppi problemi.',
    'Cosa fa un pomodoro che si sente solo? Un sugo.',
    'Qual è il colmo per un poliziotto? Non avere le manette.',
    'Sai perché le cicogne volano verso sud? Perché è troppo lontano andarci a piedi.',
    'Cosa dice un computer a un altro? Non mi connetto con te.',
    'Qual è il colmo per un fotografo? Non avere il rullino.',
    'Perché gli scheletri non vanno mai a fare la spesa? Perché non hanno il fegato.',
    'Cosa fa un\'ape in banca? Il miele degli interessi.',
    'Qual è il colmo per un giardiniere? Avere un prato sintetico.',
    'Sai perché le galline attraversano la strada? Per arrivare dall\'altra parte.',
    'Cosa dice una scarpa destra a una sinistra? Ci vediamo alla fine del cammino.',
    'Qual è il colmo per un barbiere? Avere la testa fra le nuvole.',
    'Perché gli orsi vanno in letargo? Perché sono stanchi di cercare miele.',
    'Cosa fa un orologio fermo? Segna l\'ora giusta due volte al giorno.',
    'Qual è il colmo per un chirurgo? Operare di fretta.',
    'Sai perché il leone non gioca a carte? Perché ci sono troppi ghepardi.',
    'Cosa dice una tazza a un cucchiaino? Sei un po\' agitato.',
    'Qual è il colmo per un naufrago? Non avere mai pace.',
    'Perché il caffè è andato in tribunale? Perché era troppo amaro.',
    'Cosa fa un astronauta in una pizzeria? Ordina una pizza spaziale.',
    'Qual è il colmo per un pilota? Non avere i piedi per terra.',
    'Sai perché le mucche fanno il latte? Perché non sanno fare il caffè.',
    'Cosa dice una candela a un\'altra? Sei molto accesa oggi.',
    'Qual è il colmo per un pescatore? Prendere un luccio in faccia.',
    'Perché i pesci vivono in acqua salata? Perché il pepe li fa starnutire.',
    'Cosa fa una matita che ha sonno? Si tempera.',
    'Qual è il colmo per un vigile? Non saper dirigere il traffico.',
    'Sai perché i ragni sono buoni ingegneri? Perché tessono bene.',
    'Cosa dice un libro a una biblioteca? Mi sento letto.',
    'Qual è il colmo per un idraulico? Perdere il filo.',
    'Perché il re va sempre a teatro? Perché ha la corona.',
    'Cosa fa un cane che ride? Un "bau-bau" comico.',
    'Qual è il colmo per un fotografo? Non avere occhio.',
    'Sai perché i sassi non ridono? Perché sono duri.',
    'Cosa dice una lampada a un interruttore? Mi accendi.',
    'Qual è il colmo per un sarto? Non avere stoffa.',
    'Perché il sole va a scuola? Per diventare luminoso.',
    'Cosa fa un cuscino che ha finito di lavorare? Riposa.',
    'Qual è il colmo per un pasticcere? Non avere farina nel sacco.',
    'Sai perché i treni sono puntuali? Perché hanno i binari fissi.',
    'Cosa dice una nuvola a un\'altra? Sei un po\' pesante oggi.',
    'Qual è il colmo per un dentista? Non avere voglia di parlare.',
    'Perché i calzini si perdono? Perché amano l\'avventura.',
    'Cosa fa una radio che si sente sola? Si sintonizza.',
    'Qual è il colmo per un astronomo? Non avere vista.',
    'Sai perché la gomma non cancella bene? Perché è stanca.',
    'Cosa dice una forchetta a un piatto? Sei troppo vuoto.',
    'Qual è il colmo per un muratore? Non avere casa.',
    'Perché le chitarre hanno le corde? Per suonare la vita.',
    'Cosa fa una busta che ha paura? Si sigilla.',
    'Qual è il colmo per un pilota? Non saper volare.',
    'Sai perché le candele si sciolgono? Perché sono tenere.',
    'Cosa dice un righello a un foglio? Ti misuro.',
    'Qual è il colmo per un sarto? Essere sempre in filo.',
    'Perché i sub vanno giù? Per trovare il tesoro.',
    'Cosa fa un pennello che non dipinge? Si riposa.',
    'Qual è il colmo per un astronomo? Non aver la testa fra le stelle.',
    'Sai perché le tazze non ridono? Perché sono di ceramica.',
    'Cosa dice una matita a un temperino? Mi stai facendo male.',
    'Qual è il colmo per un pescatore? Non avere pazienza.',
    'Perché il treno fischia? Perché è stanco di correre.',
    'Cosa fa una radio che canta? La hit.',
    'Qual è il colmo per un pasticcere? Non avere la ricetta.',
    'Sai perché il cielo è blu? Perché è felice.',
    'Cosa dice una bustina di tè a un\'altra? Mi sento tutta infusa.',
    'Qual è il colmo per un vigile del fuoco? Non avere acqua.',
    'Perché la matita è finita? Perché ha dato tutto.',
    'Cosa fa una lampada che non illumina? Si è fulminata.'
  ],
  cotidiano: [
    'La mia vita è un susseguirsi di "non trovo le chiavi".',
    'Ho deciso di iniziare la dieta, ma il frigo mi guarda male.',
    'Il lunedì mattina è il giorno in cui il caffè diventa un diritto umano.',
    'La mia pazienza ha un limite, ed è verso le 8:00 di mattina.',
    'Dicono che il denaro non faccia la felicità, ma aiuta a comprare il caffè.',
    'Ho provato a essere produttivo, poi ho visto un video su YouTube.',
    'La cosa più difficile della giornata è alzarsi dal divano.',
    'Sembro normale, ma nella mia testa sto cantando un musical.',
    'Il Wi-Fi di casa mia è come il mio umore: va e viene.',
    'Ho più schede aperte nel cervello che nel browser.',
    'Cucinare è un atto di amore, ma ordinare la pizza è un atto di sopravvivenza.',
    'La mia memoria è una passaporta: entra tutto e esce tutto.',
    'L\'unica relazione stabile che ho è con il mio cuscino.',
    'Non sono pigro, sono in modalità risparmio energetico.',
    'La mia casa è un museo dell\'arte del disordine.',
    'Ho comprato un libro sul disordine, ma non so dove l\'ho messo.',
    'Il mio superpotere è dimenticare perché sono entrato in una stanza.',
    'La vita sarebbe più semplice se avessi un tasto "reset".',
    'Ho parlato da solo oggi, ho avuto un ottimo confronto.',
    'Il mio unico esercizio fisico è evitare le scale.',
    'Sono un esperto nel fare piani che non seguirò mai.',
    'La mia routine di bellezza è: "speriamo che passi inosservato".',
    'Ho speso tutto in "cose di cui non ho bisogno" su Internet.',
    'Il mio livello di maturità dipende da chi ho davanti.',
    'Sono l\'unico a ridere delle mie battute.',
    'Il mio orientamento è: "seguo la gente, prima o poi arrivano da qualche parte".',
    'Ho cercato di organizzare la giornata, poi è arrivato un meme.',
    'La vita è un mistero, soprattutto quando cerco di pagare le bollette.',
    'Il mio talento nascosto è trovare scuse creative.',
    'Sono un fan della libertà, soprattutto quella di dormire.',
    'Ho provato a fare meditazione, ma pensavo a cosa mangiare dopo.',
    'Il mio vocabolario è composto per il 50% da sarcasmo.',
    'La mia auto è diventata un secondo ufficio, ma senza la scrivania.',
    'Ho il dono di far sembrare complicato tutto.',
    'Il caffè è l\'unico amico che non mi tradisce mai.',
    'Sono un collezionista di oggetti che userò "prima o poi".',
    'La mia vita sociale si basa su "ci sentiamo" e non sentirsi mai.',
    'Ho un ottimo rapporto con il tasto "posticipa" della sveglia.',
    'Il mio sport preferito è il divaning.',
    'Sono un ottimista: penso sempre che andrà bene, dopo un sonnellino.',
    'La mia cucina è un luogo di esperimenti falliti.',
    'Ho bisogno di una vacanza dalla vacanza.',
    'Il mio umore cambia più velocemente del tempo a Milano.',
    'Sono un professionista nel rimandare le cose importanti.',
    'La mia lista di cose da fare è un libro fantasy.',
    'Ho cercato di essere serio, ma mi è scappata una risata.',
    'Il mio cuscino sa troppe cose su di me.',
    'Sono un esperto in "faccio finta di ascoltare".',
    'La mia memoria è selettiva: ricordo solo le cose inutili.',
    'Ho speso ore a decidere cosa guardare su Netflix.',
    'Il mio frigo è un deserto con un po\' di ketchup.',
    'Sono una persona mattiniera, ma solo dopo le 11.',
    'Ho provato a fare yoga, ma mi sono addormentato.',
    'Il mio unico obiettivo oggi è non fare nulla di male.',
    'Sono un fanatico delle liste che non leggo mai.',
    'La mia vita è un costante "dove ho messo il telefono?".',
    'Ho bisogno di più caffè per gestire la mia stanchezza.',
    'Sono un esperto nel trovare il lato negativo di ogni cosa.',
    'Il mio divano è il posto più comodo della terra.',
    'Ho provato a fare pulizie, ma ho trovato vecchie foto.',
    'Sono una persona solare, ma solo con il sole.',
    'Il mio unico talento è complicarmi la vita.',
    'Ho bisogno di un assistente per le piccole decisioni.',
    'Sono un professionista del "vedremo domani".',
    'Il mio umore dipende da quanta pizza ho mangiato.',
    'Ho cercato di imparare una lingua, ma so dire solo "ciao".',
    'Sono un fan del riposo forzato.',
    'Il mio telefono ha più batteria di me.',
    'Ho provato a essere organizzato, è durato 5 minuti.',
    'Sono un esperto in battute pessime.',
    'Il mio unico piano per il futuro è il pranzo.',
    'Ho bisogno di un telecomando per la mia vita.',
    'Sono un fan del relax assoluto.',
    'Il mio livello di energia è a zero.',
    'Ho provato a fare il bravo, ma è noioso.'
  ],
  familia: [
    'Mia madre crede che io abbia sempre fame, a qualsiasi ora.',
    'Mio padre pensa di saper aggiustare tutto con lo scotch.',
    'Alle riunioni di famiglia si parla sempre di chi si sposa.',
    'Mio fratello minore è sempre il preferito, non si sa perché.',
    'Mia nonna pensa che Internet sia una stregoneria.',
    'Il gruppo WhatsApp di famiglia è un posto di meme e buongiornissimo.',
    'Mio padre dice sempre: "Ai miei tempi si faceva meglio".',
    'Mia sorella mi ruba i vestiti e dice che sono suoi.',
    'A Natale il gioco della tombola diventa una questione di vita o di morte.',
    'Mia madre chiama sempre per chiedere "che mangi stasera?".',
    'Mio nonno racconta la stessa storia da 20 anni.',
    'In famiglia il telecomando è l\'oggetto più conteso.',
    'Mia zia ha sempre un\'opinione su tutto, soprattutto su di me.',
    'Mio fratello si crede un genio della tecnologia.',
    'Mia madre pensa che tutti i miei amici siano una cattiva influenza.',
    'Mio padre crede che l\'aria condizionata sia un male assoluto.',
    'La mia famiglia è come un circo, ma senza leoni.',
    'Mia nonna mi dà soldi di nascosto, come se fosse un crimine.',
    'Mio cugino è diventato un esperto di tutto su Internet.',
    'A pranzo da mia madre, se non mangi il secondo ti senti in colpa.',
    'Mio padre è convinto di non perdersi mai, solo "esplora".',
    'Mia sorella vive nel suo mondo, e io in quello dei miei genitori.',
    'Le cene di famiglia sono il posto dove nascono i drammi.',
    'Mio nonno è il capo segreto della casa.',
    'Mia madre insiste che io debba mettere la maglia della salute.',
    'Mio padre prova a cucinare, ma alla fine ordiniamo la pizza.',
    'In famiglia ci si dice sempre la verità, anche quella che non vuoi sentire.',
    'Mia zia non si ricorda mai il mio nome.',
    'Mio fratello minore è il maestro dei capricci.',
    'La casa dei miei genitori è l\'unico posto dove sono ancora un bambino.',
    'Mio nonno mi regala sempre calzini, ogni anno.',
    'Mia madre sa sempre dove ho lasciato le chiavi.',
    'Mio padre crede che le luci restino accese per magia.',
    'A casa di mia nonna non si muore mai di fame.',
    'Mia sorella pensa di essere la più intelligente.',
    'Mio cugino è quello che ha sempre successo in tutto.',
    'Le discussioni in famiglia sono maratone di urla.',
    'Mio padre prova sempre a darmi consigli finanziari inutili.',
    'Mia madre pensa che io non dorma abbastanza.',
    'Mio nonno è un esperto di giardinaggio estremo.',
    'In famiglia si finisce sempre a parlare di politica.',
    'Mia sorella mi chiama solo quando ha bisogno di soldi.',
    'Mio fratello fa sempre il misterioso.',
    'Mio padre guarda la TV a un volume altissimo.',
    'Mia nonna pensa che ogni mio mal di testa sia grave.',
    'In famiglia siamo tutti un po\' fuori di testa.',
    'Mia zia è una spia del quartiere.',
    'Mio cugino vuole fare il modello, ma ha fatto l\'impiegato.',
    'Mia madre è il boss della casa.',
    'Mio padre crede di essere un esperto di vino.',
    'A tavola non si parla di lavoro, ma ci finiamo sempre.',
    'Mia nonna ha un\'opinione su tutto, anche sul meteo.',
    'Mio fratello minore è un combinaguai.',
    'Mia sorella ha sempre un vestito nuovo che non mi presta.',
    'Mio padre pensa di essere un comico.',
    'Mia madre si preoccupa per cose che non esistono.',
    'Il cane di famiglia è trattato meglio di me.',
    'Mio nonno legge il giornale di ieri.',
    'Mia zia mi chiede sempre "quando ti sposi?".',
    'Mio cugino pensa di essere il re del mondo.',
    'In famiglia si dividono i compiti, ma li faccio io.',
    'Mia madre chiama i miei amici per sapere dove sono.',
    'Mio padre è convinto di saper guidare meglio di tutti.',
    'Mia sorella si sente un\'attrice.',
    'Mio nonno ama raccontare i tempi andati.',
    'Mia nonna mi vuole nutrire ogni ora.',
    'Mio fratello non sa cucinare neanche l\'acqua.',
    'Mia madre è una supereroina senza mantello.',
    'Mio padre prova a fare il moderno.',
    'In famiglia ridiamo tutti delle nostre sventure.',
    'Mia zia è convinta di avere doti paranormali.',
    'Mio cugino fa sempre il prezioso.',
    'Mia sorella mi ruba sempre il caricabatterie.',
    'Mio nonno si addormenta sulla poltrona.',
    'Mia madre è il mio posto sicuro.'
  ],
  escola_trabalho: [
    'Il mio lavoro consiste nel fingere di lavorare per 8 ore.',
    'La riunione poteva essere una mail, ma a qualcuno piace parlare.',
    'Il mio capo pensa che "multitasking" significhi fare tutto male.',
    'La pausa caffè è l\'unico momento in cui mi sento vivo.',
    'Il PC si blocca sempre quando ho più fretta.',
    'L\'ufficio è dove i sogni vanno a morire.',
    'A scuola mi dicevano che sarei stato qualcuno, ora sono un impiegato.',
    'Il mio capo mi chiede flessibilità, ma solo per gli straordinari.',
    'Ogni volta che dico "faccio subito", intendo "fra un\'ora".',
    'L\'Excel è l\'arma di distruzione di massa del mio ufficio.',
    'A lavoro, "urgente" è sinonimo di "fai tutto tu".',
    'Il mio collega parla troppo, ho bisogno di cuffie giganti.',
    'La sedia dell\'ufficio è la mia nemica principale.',
    'Ho più schede aperte che neuroni funzionanti.',
    'Il capo mi chiama sempre 5 minuti prima di uscire.',
    'La scuola era meglio, almeno c\'era l\'intervallo.',
    'Il mio lavoro è risolvere problemi che io stesso ho creato.',
    'Sono un professionista nel fare la faccia seria durante le riunioni.',
    'La stampante sente la mia paura e si inceppa.',
    'Il mio stipendio è un\'opinione.',
    'Il venerdì pomeriggio il tempo si ferma.',
    'Sono un esperto nel fare il minimo indispensabile.',
    'Il capo crede che il team sia una famiglia, io credo sia un inferno.',
    'A scuola studiavo per il voto, a lavoro sopravvivo per lo stipendio.',
    'La mail di lavoro è l\'inizio di ogni mia sofferenza.',
    'Sono il re dei messaggi automatici "sono in riunione".',
    'Il capo pensa di essere un leader, ma è solo un rompiscatole.',
    'Ho imparato più su Internet che in 5 anni di laurea.',
    'Il lunedì è il giorno in cui vorrei essere un gatto.',
    'Il lavoro di squadra è un ottimo modo per dare la colpa agli altri.',
    'Il mio PC è un dinosauro, e io sono il suo domatore.',
    'Sono un maestro nel fare finta di ascoltare in videochiamata.',
    'Il capo mi ha dato una "sfida", cioè un lavoro extra gratis.',
    'L\'unica cosa veloce in ufficio è il mio desiderio di andare a casa.',
    'La mia scrivania è un caos organizzato.',
    'Sono un esperto in battute pessime con i colleghi.',
    'Il capo pensa che gli straordinari siano un piacere.',
    'Ho una relazione complicata con il mio ufficio.',
    'Il mio lavoro è fare fotocopie della mia frustrazione.',
    'La scuola mi ha preparato a mentire sui compiti.',
    'Sono un professionista del "ci penso dopo".',
    'Il capo crede che la produttività aumenti con più riunioni.',
    'Sono l\'unico a ridere delle mie battute in ufficio.',
    'Il PC va lento, ma il mio desiderio di andare via va veloce.',
    'A lavoro ho imparato l\'arte della pazienza estrema.',
    'Il mio capo non capisce che ho una vita.',
    'La riunione è un ottimo modo per dormire ad occhi aperti.',
    'Sono un esperto nel creare problemi di poco conto.',
    'Il mio stipendio non copre il mio stress.',
    'L\'ufficio è un posto dove scopri chi odi veramente.',
    'Il capo chiede l\'impossibile con risorse nulle.',
    'La scuola era più facile, c\'era solo da ascoltare.',
    'Il mio lavoro mi ha reso un esperto di caffè scadente.',
    'Sono un genio nel fare finta di cercare documenti.',
    'Il lunedì mattina è una prova di resistenza.',
    'Il capo pensa che il tempo sia denaro, il mio è gratis.',
    'Il lavoro è un mistero che nessuno vuole risolvere.',
    'Sono un professionista dell\'attesa del fine settimana.',
    'Il PC è il mio peggior nemico in ufficio.',
    'Il capo chiede feedback, poi fa come vuole.',
    'Sono il re dei "ti faccio sapere".',
    'Il lavoro è un luogo dove il tempo è relativo.',
    'L\'ufficio mi ha insegnato a odiare i lunedì.',
    'Il capo pensa che siamo tutti entusiasti.',
    'Sono un esperto in soluzioni temporanee.',
    'La riunione è un buco nero di tempo.',
    'Il lavoro mi dà i soldi per dimenticare il lavoro.',
    'Il capo è una persona che non ha hobby.',
    'Sono un maestro nel fare il "lavoro di squadra".',
    'Il lunedì è il mio giorno peggiore.',
    'Il PC va in blocco appena mi serve.',
    'Il lavoro mi ha insegnato la diplomazia dell\'odio.',
    'Sono un professionista dell\'assenteismo strategico.',
    'Il capo crede nella magia dei risultati.',
    'Il lavoro è una sfida che non ho mai chiesto.'
  ],
  absurdo: [
    'Un pesce cade dal quinto piano e fa: "plop".',
    'Cosa fa un cane con un coltello? Taglia il prosciutto.',
    'Perché le nuvole volano? Perché hanno le ali di vapore.',
    'C\'era una volta un uomo così alto che si doveva sedere per vedere il cielo.',
    'Cosa fa un pomodoro in un frigo? Si congela dal ridere.',
    'Perché il libro è andato dal dottore? Perché aveva perso le pagine.',
    'Cosa dice un\'ape a un\'altra? Sei molto pungente.',
    'Un semaforo è andato a scuola per imparare il verde.',
    'Cosa fa un gatto in una navicella? Il gattonauta.',
    'Perché il cielo è blu? Perché ha bevuto troppo sciroppo.',
    'Cosa dice una lampada a un raggio di sole? Sei troppo luminoso.',
    'Una sedia ha deciso di camminare, ma si è inciampata.',
    'Cosa fa un panino al parco? Prende il sole.',
    'Perché la luna è bianca? Perché ha finito il colorante.',
    'Cosa dice una forchetta a un piatto? Mi senti dentro?',
    'Un orologio ha deciso di correre, ma è rimasto indietro.',
    'Perché la matita è andata in pensione? Perché ha finito il piombo.',
    'Cosa fa un ombrello al sole? Si apre per protezione.',
    'Un computer ha imparato a cucinare, ma ha bruciato tutto.',
    'Perché la pioggia cade? Perché ha paura dell\'altezza.',
    'Cosa dice una tazza a un cucchiaino? Sei troppo mosso.',
    'Una porta si è arrabbiata e ha sbattuto se stessa.',
    'Perché il treno non mangia? Perché ha già i binari.',
    'Cosa fa un tappeto che vola? Il pilota.',
    'Perché la banana è dritta? Perché ha fatto ginnastica.',
    'Cosa dice un cassetto a un altro? Hai visto i miei calzini?',
    'Un pennello ha deciso di dipingere l\'aria.',
    'Perché il sub va al bar? Per bere un drink profondo.',
    'Cosa fa un cuscino che ha paura? Si gonfia.',
    'Una radio ha deciso di trasmettere pensieri positivi.',
    'Perché il pasticcere è triste? Perché ha finito lo zucchero.',
    'Cosa dice una matita a un foglio? Ti sto scrivendo una storia.',
    'Un astronomo ha perso la sua luna.',
    'Perché il fiore balla? Perché c\'è vento.',
    'Cosa fa una lampada al buio? Si accende di speranza.',
    'Una scarpa destra ha deciso di essere sinistra.',
    'Perché il muratore ha fatto una casa rotonda? Per non avere angoli.',
    'Cosa dice un telefono a un altro? Ti ho squillato nel cuore.',
    'Un astronauta ha trovato un alieno che mangiava pizza.',
    'Perché la gomma cancella? Perché ha la coscienza sporca.',
    'Cosa fa un pescatore nel deserto? Pesca miraggi.',
    'Un attore ha recitato la parte di un sasso.',
    'Perché il libro è arrabbiato? Perché l\'hanno sfogliato male.',
    'Cosa dice una forchetta a un cucchiaio? Sei un po\' rotondo.',
    'Un orologio ha segnato l\'ora del futuro.',
    'Perché la bottiglia ha paura? Perché è vuota.',
    'Cosa fa un giocoliere con i sassi? Il deserto magico.',
    'Un ombrello ha deciso di piovere al contrario.',
    'Perché il vigile ha fatto una multa al vento?',
    'Cosa dice un cassetto a un armadio? Siamo in famiglia.',
    'Un meccanico ha aggiustato l\'anima di un\'auto.',
    'Perché la radio parla da sola? Perché ha troppe voci.',
    'Cosa fa un pilota in bici? Volo basso.',
    'Una busta ha inviato se stessa.',
    'Perché il sub guarda le stelle?',
    'Cosa dice un cuscino a un letto? Grazie del supporto.',
    'Un pittore ha dipinto il silenzio.',
    'Perché la matita non vuole temperarsi?',
    'Cosa dice un astronomo alla luna? Sei molto timida.',
    'Un pennello ha fatto il ritratto a un\'ombra.',
    'Perché il pasticcere fa dolci amari?',
    'Cosa dice un righello alla gomma? Tu riduci, io allungo.',
    'Un pescatore ha preso una stella.',
    'Perché la lampada è triste?',
    'Cosa fa un sarto con le nuvole?',
    'Un gatto ha imparato a volare.',
    'Perché il sole ha gli occhiali?',
    'Cosa dice un libro a un lettore?',
    'Un computer ha sognato di essere umano.',
    'Perché la pioggia è salata?',
    'Cosa fa una tazza con le ali?',
    'Una porta si è aperta verso l\'infinito.',
    'Perché il treno fischia alle montagne?',
    'Cosa fa una radio spenta?',
    'Un pasticcere ha fatto una torta di aria.'
  ]
};

    const READING_CHALLENGES_PT = [
  'Leia como se fosse um locutor de rádio dramático.', 'Leia segurando o riso a cada pausa.',
  'Leia como se estivesse contando um segredo importante.', 'Leia com voz de desenho animado.',
  'Leia como se estivesse muito cansado.', 'Leia em ritmo de notícia urgente.',
  'Leia como se estivesse em uma peça de teatro exagerada.', 'Leia com total seriedade.',
  'Leia como se estivesse apresentando um prêmio.', 'Leia como se fosse um professor bravo.',
  'Leia como um narrador de futebol empolgado.', 'Leia como um stand-up comedian ruim.',
  'Leia com sotaque caipira bem marcado.', 'Leia sussurrando como se houvesse um espião na sala.',
  'Leia gritando como se estivesse do outro lado da rua.', 'Leia como um robô sem emoção.',
  'Leia chorando de emoção.', 'Leia como um vilão de novela mexicana.',
  'Leia pulando em um pé só.', 'Leia como se estivesse explicando para uma criança de 5 anos.',
  'Leia com a língua presa.', 'Leia como se tivesse acabado de acordar.',
  'Leia imitando um animal de sua escolha.', 'Leia como um vendedor de carros usados.',
  'Leia com um ritmo extremamente lento.', 'Leia na velocidade de um rapper.',
  'Leia como se estivesse sob um interrogatório.', 'Leia fingindo que está com soluço.',
  'Leia com sotaque de Portugal bem carregado.', 'Leia como um pirata.',
  'Leia fazendo gestos exagerados com as mãos.', 'Leia como se estivesse cantando uma ópera.',
  'Leia de olhos fechados.', 'Leia como um apresentador de telejornal clássico.',
  'Leia como se estivesse em uma caverna ecoando.', 'Leia com a boca cheia (simulando).',
  'Leia como se fosse o Papai Noel.', 'Leia como um mestre de cerimônias.',
  'Leia sussurrando as palavras e gritando as pontuações.', 'Leia como um fantasma.',
  'Leia fazendo uma voz aguda e fina.', 'Leia fazendo uma voz muito grossa.',
  'Leia como se estivesse numa ligação ruim com interferência.', 'Leia como um alienígena tentando falar português.',
  'Leia como se estivesse com muito medo.', 'Leia como um filósofo pensativo.',
  'Leia como se estivesse dando uma bronca.', 'Leia como se fosse um mágico revelando um truque.',
  'Leia usando apenas uma vogal (ex: troque tudo por "a").', 'Leia como se estivesse num comercial de luxo.',
  'Leia pausando a cada palavra como se estivesse pensando.', 'Leia como uma criança mimada.',
  'Leia com o tom de voz de quem acabou de ganhar na loteria.', 'Leia como se fosse um cientista louco.',
  'Leia como se estivesse lendo um testamento.', 'Leia como um lutador de boxe antes da luta.',
  'Leia como se fosse uma fofoca de elevador.', 'Leia com um tom de deboche total.',
  'Leia como se estivesse na lua (falando devagar).', 'Leia como um mímico (sem som, só mexendo a boca).',
  'Leia como se fosse um avô/avó contando história.', 'Leia como um militar dando ordens.',
  'Leia como se estivesse num tribunal.', 'Leia como um turista perdido.',
  'Leia como se estivesse contando uma lenda urbana.', 'Leia como um guru espiritual.',
  'Leia trocando as sílabas das palavras.', 'Leia com muita raiva.',
  'Leia como se estivesse num momento de romance.', 'Leia como um zumbi.',
  'Leia como um cowboy de filme velho.', 'Leia como se fosse uma inteligência artificial.',
  'Leia com uma risada maníaca no final.', 'Leia como se estivesse no palco do Oscar.',
  'Leia como se estivesse sob efeito de hélio.'
];

const READING_CHALLENGES_EN = [
  'Read like a dramatic radio host.', 'Read while trying to hold back laughter.',
  'Read like you are sharing a state secret.', 'Read with a cartoonish voice.',
  'Read like you are extremely tired.', 'Read like a breaking news anchor.',
  'Read like an over-the-top theater actor.', 'Read with deadly seriousness.',
  'Read like you are presenting an award.', 'Read like a strict school teacher.',
  'Read like a high-energy sports commentator.', 'Read like a failing stand-up comedian.',
  'Read with a thick Southern drawl.', 'Read whispering as if a spy is listening.',
  'Read shouting as if across the street.', 'Read like an emotionless robot.',
  'Read like you are weeping with joy.', 'Read like a soap opera villain.',
  'Read while hopping on one foot.', 'Read like explaining to a 5-year-old.',
  'Read with a lisp.', 'Read as if you just woke up.',
  'Read imitating your favorite animal.', 'Read like a shady used car salesman.',
  'Read at an extremely slow pace.', 'Read at the speed of a rapper.',
  'Read like you are being interrogated.', 'Read pretending to have the hiccups.',
  'Read with a thick British royal accent.', 'Read like a pirate.',
  'Read using exaggerated hand gestures.', 'Read like an opera singer.',
  'Read with your eyes closed.', 'Read like a classic news anchor.',
  'Read like you are inside a canyon.', 'Read as if your mouth is full.',
  'Read like Santa Claus.', 'Read like a master of ceremonies.',
  'Read whispering words and shouting punctuation.', 'Read like a ghost.',
  'Read with a high-pitched voice.', 'Read with an extremely deep voice.',
  'Read like a bad phone connection.', 'Read like an alien learning English.',
  'Read like you are terrified.', 'Read like a deep philosopher.',
  'Read like you are giving someone a lecture.', 'Read like a magician revealing a trick.',
  'Read using only one vowel (e.g., replace everything with "ah").', 'Read like a luxury car commercial.',
  'Read pausing after every word.', 'Read like a spoiled child.',
  'Read like you just won the lottery.', 'Read like a mad scientist.',
  'Read like reading a last will.', 'Read like a boxer before a fight.',
  'Read like elevator gossip.', 'Read with total sarcasm.',
  'Read like you are on the moon.', 'Read like a mime (only mouth movements).',
  'Read like a grandparent telling a story.', 'Read like a drill sergeant.',
  'Read like you are in a courtroom.', 'Read like a lost tourist.',
  'Read like an urban legend teller.', 'Read like a spiritual guru.',
  'Read switching word syllables.', 'Read with intense anger.',
  'Read like a romantic confession.', 'Read like a zombie.',
  'Read like an old Western cowboy.', 'Read like an AI.',
  'Read with a maniacal laugh at the end.', 'Read like you are on the Oscar stage.',
  'Read as if you inhaled helium.'
];

const READING_CHALLENGES_ES = [
  'Léelo como un locutor de radio dramático.', 'Léelo aguantando la risa en cada pausa.',
  'Léelo como si contaras un secreto importante.', 'Léelo con voz de dibujo animado.',
  'Léelo como si estuvieras muy cansado.', 'Léelo al ritmo de una noticia urgente.',
  'Léelo como si estuvieras en una obra de teatro exagerada.', 'Léelo con total seriedad.',
  'Léelo como si presentaras un premio.', 'Léelo como un profesor enojado.',
  'Léelo como un narrador deportivo emocionado.', 'Léelo como un cómico de stand-up malo.',
  'Léelo con acento andaluz muy marcado.', 'Léelo susurrando como si hubiera un espía.',
  'Léelo gritando como si estuvieras lejos.', 'Léelo como un robot sin emociones.',
  'Léelo llorando de emoción.', 'Léelo como un villano de telenovela.',
  'Léelo saltando en un pie.', 'Léelo como si explicaras a un niño de 5 años.',
  'Léelo con ceceo marcado.', 'Léelo como si acabaras de despertar.',
  'Léelo imitando a un animal.', 'Léelo como un vendedor de coches usados.',
  'Léelo a un ritmo extremadamente lento.', 'Léelo a la velocidad de un rapero.',
  'Léelo como si estuvieras en un interrogatorio.', 'Léelo fingiendo tener hipo.',
  'Léelo con acento argentino muy marcado.', 'Léelo como un pirata.',
  'Léelo haciendo gestos exagerados.', 'Léelo como si cantaras ópera.',
  'Léelo con los ojos cerrados.', 'Léelo como un presentador de noticias clásico.',
  'Léelo como si estuvieras en una cueva con eco.', 'Léelo con la boca llena.',
  'Léelo como si fueras Papá Noel.', 'Léelo como un maestro de ceremonias.',
  'Léelo susurrando palabras y gritando la puntuación.', 'Léelo como un fantasma.',
  'Léelo con voz aguda y fina.', 'Léelo con voz muy grave.',
  'Léelo como si hubiera mala señal de teléfono.', 'Léelo como un alienígena.',
  'Léelo como si tuvieras mucho miedo.', 'Léelo como un filósofo pensativo.',
  'Léelo como si estuvieras regañando a alguien.', 'Léelo como un mago revelando un truco.',
  'Léelo usando solo una vocal (ej: cambia todo por "a").', 'Léelo como un comercial de lujo.',
  'Léelo haciendo pausas en cada palabra.', 'Léelo como un niño mimado.',
  'Léelo con tono de quien ganó la lotería.', 'Léelo como un científico loco.',
  'Léelo como si leyeras un testamento.', 'Léelo como un boxeador antes de pelear.',
  'Léelo como un cotilleo de ascensor.', 'Léelo con sarcasmo total.',
  'Léelo como si estuvieras en la luna.', 'Léelo como un mimo.',
  'Léelo como un abuelo contando historias.', 'Léelo como un sargento militar.',
  'Léelo como si estuvieras en un juicio.', 'Léelo como un turista perdido.',
  'Léelo como si contaras una leyenda urbana.', 'Léelo como un gurú espiritual.',
  'Léelo cambiando las sílabas de las palabras.', 'Léelo con mucha rabia.',
  'Léelo como si fuera un momento romántico.', 'Léelo como un zombi.',
  'Léelo como un vaquero de película vieja.', 'Léelo como una IA.',
  'Léelo con una risa maníaca al final.', 'Léelo como si estuvieras en los Oscar.',
  'Léelo como si hubieras aspirado helio.'
];

const READING_CHALLENGES_FR = [
  'Lisez comme un animateur radio dramatique.', 'Lisez en retenant votre rire à chaque pause.',
  'Lisez comme si vous racontiez un secret important.', 'Lisez avec une voix de dessin animé.',
  'Lisez comme si vous étiez épuisé.', 'Lisez comme pour un flash info urgent.',
  'Lisez comme dans une pièce de théâtre exagérée.', 'Lisez avec un sérieux total.',
  'Lisez comme si vous remettiez un prix.', 'Lisez comme un professeur en colère.',
  'Lisez comme un commentateur sportif enthousiaste.', 'Lisez comme un mauvais humoriste.',
  'Lisez avec un accent du sud très prononcé.', 'Lisez en chuchotant comme un espion.',
  'Lisez en criant comme si vous étiez loin.', 'Lisez comme un robot sans émotion.',
  'Lisez en pleurant d\'émotion.', 'Lisez comme le méchant d\'un film.',
  'Lisez en sautant sur un pied.', 'Lisez comme à un enfant de 5 ans.',
  'Lisez en zézayant.', 'Lisez comme si vous veniez de vous réveiller.',
  'Lisez en imitant un animal.', 'Lisez comme un vendeur de voitures d\'occasion.',
  'Lisez à un rythme extrêmement lent.', 'Lisez à la vitesse d\'un rappeur.',
  'Lisez comme si vous étiez interrogé.', 'Lisez en faisant semblant d\'avoir le hoquet.',
  'Lisez avec un accent québécois très marqué.', 'Lisez comme un pirate.',
  'Lisez en faisant des gestes exagérés.', 'Lisez comme si vous chantiez l\'opéra.',
  'Lisez les yeux fermés.', 'Lisez comme un présentateur du JT classique.',
  'Lisez comme si vous étiez dans une grotte.', 'Lisez la bouche pleine.',
  'Lisez comme si vous étiez le Père Noël.', 'Lisez comme un maître de cérémonie.',
  'Lisez en chuchotant les mots et en criant la ponctuation.', 'Lisez comme un fantôme.',
  'Lisez avec une voix aiguë.', 'Lisez avec une voix très grave.',
  'Lisez comme si vous aviez une mauvaise connexion téléphonique.', 'Lisez comme un extraterrestre.',
  'Lisez comme si vous aviez très peur.', 'Lisez comme un philosophe pensif.',
  'Lisez comme si vous faisiez la leçon.', 'Lisez comme un magicien.',
  'Lisez en utilisant qu\'une seule voyelle.', 'Lisez comme une pub de luxe.',
  'Lisez en faisant des pauses à chaque mot.', 'Lisez comme un enfant gâté.',
  'Lisez comme si vous aviez gagné au loto.', 'Lisez comme un savant fou.',
  'Lisez comme un testament.', 'Lisez comme un boxeur avant un combat.',
  'Lisez comme un potin d\'ascenseur.', 'Lisez avec un sarcasme total.',
  'Lisez comme si vous étiez sur la lune.', 'Lisez comme un mime.',
  'Lisez comme un grand-père racontant une histoire.', 'Lisez comme un sergent-chef.',
  'Lisez comme si vous étiez au tribunal.', 'Lisez comme un touriste perdu.',
  'Lisez comme une légende urbaine.', 'Lisez comme un gourou spirituel.',
  'Lisez en inversant les syllabes.', 'Lisez avec beaucoup de colère.',
  'Lisez comme un moment romantique.', 'Lisez comme un zombie.',
  'Lisez comme un cow-boy de vieux western.', 'Lisez comme une IA.',
  'Lisez avec un rire maniaque à la fin.', 'Lisez comme aux Oscars.',
  'Lisez comme si vous aviez inhalé de l\'hélium.'
];

const READING_CHALLENGES_DE = [
  'Lies wie ein dramatischer Radiomoderator.', 'Lies und versuche, bei jeder Pause nicht zu lachen.',
  'Lies, als würdest du ein Staatsgeheimnis verraten.', 'Lies mit einer Cartoon-Stimme.',
  'Lies, als wärst du extrem müde.', 'Lies wie ein Eilmeldungs-Sprecher.',
  'Lies wie in einem völlig übertriebenen Theaterstück.', 'Lies mit tödlicher Ernsthaftigkeit.',
  'Lies, als würdest du einen Preis verleihen.', 'Lies wie ein strenger Lehrer.',
  'Lies wie ein begeisterter Sportkommentator.', 'Lies wie ein schlechter Stand-up-Comedian.',
  'Lies mit einem extrem starken bayerischen Dialekt.', 'Lies flüsternd, als würde ein Spion zuhören.',
  'Lies schreiend, als wärst du auf der anderen Straßenseite.', 'Lies wie ein emotionsloser Roboter.',
  'Lies unter Tränen der Rührung.', 'Lies wie der Bösewicht einer Soap Opera.',
  'Lies während du auf einem Bein hüpfst.', 'Lies, als würdest du es einem 5-Jährigen erklären.',
  'Lies mit einem Lispeln.', 'Lies, als wärst du gerade erst aufgewacht.',
  'Lies, indem du ein Tier deiner Wahl imitierst.', 'Lies wie ein zwielichtiger Gebrauchtwagenhändler.',
  'Lies in extrem langsamem Tempo.', 'Lies im Tempo eines Rappers.',
  'Lies, als wärst du in einem Verhör.', 'Lies und tue so, als hättest du Schluckauf.',
  'Lies mit einem starken sächsischen Akzent.', 'Lies wie ein Pirat.',
  'Lies mit übertriebener Gestik.', 'Lies wie ein Opernsänger.',
  'Lies mit geschlossenen Augen.', 'Lies wie ein klassischer Nachrichtensprecher.',
  'Lies, als wärst du in einer Höhle mit Echo.', 'Lies, als hättest du den Mund voll.',
  'Lies wie der Weihnachtsmann.', 'Lies wie ein Zeremonienmeister.',
  'Lies die Wörter flüsternd und die Satzzeichen schreiend.', 'Lies wie ein Geist.',
  'Lies mit hoher, piepsiger Stimme.', 'Lies mit extrem tiefer Stimme.',
  'Lies wie bei einer schlechten Telefonverbindung.', 'Lies wie ein Alien, das Deutsch lernt.',
  'Lies, als hättest du schreckliche Angst.', 'Lies wie ein tiefsinniger Philosoph.',
  'Lies, als würdest du jemanden belehren.', 'Lies wie ein Zauberer bei einem Trick.',
  'Lies nur mit einem Vokal (z.B. alles mit "a").', 'Lies wie in einer Luxus-Werbung.',
  'Lies mit Pausen nach jedem Wort.', 'Lies wie ein verzogenes Kind.',
  'Lies, als hättest du gerade im Lotto gewonnen.', 'Lies wie ein verrückter Wissenschaftler.',
  'Lies wie beim Verlesen eines Testaments.', 'Lies wie ein Boxer vor dem Kampf.',
  'Lies wie beim Flüstern im Aufzug.', 'Lies mit totalem Sarkasmus.',
  'Lies, als wärst du auf dem Mond.', 'Lies wie ein Pantomime (nur Mundbewegungen).',
  'Lies wie ein Opa, der eine Geschichte erzählt.', 'Lies wie ein Drill-Sergeant.',
  'Lies, als wärst du vor Gericht.', 'Lies wie ein verirrter Tourist.',
  'Lies wie beim Erzählen einer urbanen Legende.', 'Lies wie ein spiritueller Guru.',
  'Lies, indem du die Silben der Wörter vertauschst.', 'Lies mit intensiver Wut.',
  'Lies wie in einer romantischen Szene.', 'Lies wie ein Zombie.',
  'Lies wie ein Cowboy aus einem alten Western.', 'Lies wie eine KI.',
  'Lies mit einem wahnsinnigen Lachen am Ende.', 'Lies, als stündest du auf der Oscar-Bühne.',
  'Lies, als hättest du Helium eingeatmet.'
];

const READING_CHALLENGES_IT = [
  'Leggi come un drammatico speaker radiofonico.', 'Leggi trattenendo le risate a ogni pausa.',
  'Leggi come se stessi raccontando un segreto di stato.', 'Leggi con una voce da cartone animato.',
  'Leggi come se fossi esausto.', 'Leggi al ritmo di un notiziario urgente.',
  'Leggi come in una recita teatrale esagerata.', 'Leggi con totale serietà.',
  'Leggi come se stessi premiando qualcuno.', 'Leggi come un professore severo.',
  'Leggi come un cronista sportivo entusiasta.', 'Leggi come un comico fallito.',
  'Leggi con un forte accento dialettale (es. napoletano).', 'Leggi bisbigliando come se ci fosse una spia.',
  'Leggi urlando come se fossi dall\'altra parte della strada.', 'Leggi come un robot senza emozioni.',
  'Leggi piangendo per l\'emozione.', 'Leggi come il cattivo di una soap opera.',
  'Leggi saltando su un piede solo.', 'Leggi come se spiegassi a un bambino di 5 anni.',
  'Leggi con la zeppola.', 'Leggi come se ti fossi appena svegliato.',
  'Leggi imitando un animale a scelta.', 'Leggi come un venditore di auto usate.',
  'Leggi a un ritmo estremamente lento.', 'Leggi alla velocità di un rapper.',
  'Leggi come se fossi sotto interrogatorio.', 'Leggi fingendo di avere il singhiozzo.',
  'Leggi con un forte accento milanese.', 'Leggi come un pirata.',
  'Leggi facendo gesti esagerati con le mani.', 'Leggi come se cantassi all\'opera.',
  'Leggi a occhi chiusi.', 'Leggi come un classico presentatore del TG.',
  'Leggi come se fossi in una grotta con l\'eco.', 'Leggi con la bocca piena.',
  'Leggi come se fossi Babbo Natale.', 'Leggi come un maestro di cerimonie.',
  'Leggi bisbigliando le parole e urlando la punteggiatura.', 'Leggi come un fantasma.',
  'Leggi con una voce acuta e sottile.', 'Leggi con una voce molto profonda.',
  'Leggi come se avessi una pessima ricezione telefonica.', 'Leggi come un alieno che impara l\'italiano.',
  'Leggi come se avessi molta paura.', 'Leggi come un filosofo pensieroso.',
  'Leggi come se stessi facendo una ramanzina.', 'Leggi come un mago che rivela un trucco.',
  'Leggi usando solo una vocale.', 'Leggi come una pubblicità di lusso.',
  'Leggi facendo pause dopo ogni parola.', 'Leggi come un bambino viziato.',
  'Leggi con il tono di chi ha appena vinto alla lotteria.', 'Leggi come uno scienziato pazzo.',
  'Leggi come se leggessi un testamento.', 'Leggi come un pugile prima del match.',
  'Leggi come un pettegolezzo in ascensore.', 'Leggi con sarcasmo totale.',
  'Leggi come se fossi sulla luna.', 'Leggi come un mimo (solo movimenti della bocca).',
  'Leggi come un nonno che racconta una storia.', 'Leggi come un sergente istruttore.',
  'Leggi come se fossi in tribunale.', 'Leggi come un turista smarrito.',
  'Leggi come se raccontassi una leggenda metropolitana.', 'Leggi come un guru spirituale.',
  'Leggi scambiando le sillabe delle parole.', 'Leggi con molta rabbia.',
  'Leggi come se fosse un momento romantico.', 'Leggi come uno zombie.',
  'Leggi come un cowboy di un vecchio film.', 'Leggi come un\'intelligenza artificiale.',
  'Leggi con una risata maniacale alla fine.', 'Leggi come se fossi sul palco degli Oscar.',
  'Leggi come se avessi aspirato elio.'
];


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
