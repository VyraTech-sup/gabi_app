/**
 * Tema Global do All Mind App - Design AlmaSense
 * Cores, tipografia, espaçamentos e constantes visuais
 */

export const theme = {
  colors: {
    // Paleta principal (AlmaSense - Azul Petróleo)
    primary: '#3A5A6C',      // Azul-Petróleo (Fundo Principal)
    primaryDark: '#2D4A57',  // Azul-Petróleo Escuro (Botões, Cards)
    primaryLight: '#4A6A7C',
    
    secondary: '#C4A9A0',    // Bege/Rosa Claro (Fundo Terciário)
    secondaryDark: '#B39990',
    secondaryLight: '#D4B5A8', // Rosa/Bege Claro (Botões Secundários)
    
    // Tons neutros
    background: '#3A5A6C',   // Azul-Petróleo
    backgroundDark: '#2D4A57', // Azul-Petróleo Escuro
    surface: '#2D4A57',      // Cards e superfícies
    surfaceDark: '#1F3742',
    
    // Textos
    text: '#FFFFFF',         // Branco (Texto Principal)
    textSecondary: '#A0B5C0', // Cinza Claro (Texto Secundário)
    textLight: '#CCDCE5',
    textInverse: '#2D4A57',
    
    // Estados
    success: '#4A8A8A',      // Verde/Teal
    warning: '#F39C12',
    error: '#E74C3C',        // Vermelho (Destaque/Alerta)
    info: '#5DADE2',
    
    // Acentos
    accent1: '#D4B5A8',      // Rosa/Bege Claro
    accent2: '#C4A9A0',      // Bege/Rosa
    accent3: '#A0B5C0',      // Cinza Claro
    
    // Overlay e bordas
    overlay: 'rgba(58, 90, 108, 0.6)',
    border: '#FFFFFF',       // Branco (Bordas)
    borderDark: '#A0B5C0',   // Cinza Claro (Bordas secundárias)
    
    // Transparências
    shadow: 'rgba(0, 0, 0, 0.2)',
    shadowDark: 'rgba(0, 0, 0, 0.4)',
  },
  
  typography: {
    // Família de fontes (AlmaSense - Segoe UI ou System)
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
      light: 'System',
    },
    
    // Tamanhos (AlmaSense - maiores e mais impactantes)
    fontSize: {
      xs: 12,          // Tags/Etiquetas
      sm: 14,          // Tags/Etiquetas
      base: 16,        // Corpo de texto
      lg: 18,          // Corpo de texto/Subtítulos
      xl: 24,          // Subtítulos
      '2xl': 32,       // Títulos médios
      '3xl': 48,       // Títulos principais
      '4xl': 56,       // Títulos principais (grandes)
      '5xl': 64,
    },
    
    // Pesos (AlmaSense - mais light e elegante)
    fontWeight: {
      light: '300' as const,      // Textos delicados
      regular: '400' as const,    // Corpo de texto padrão
      medium: '500' as const,     // Etiquetas e destaques
      semibold: '600' as const,   // Subtítulos (menos que antes)
      bold: '700' as const,       // Apenas títulos muito importantes
      extrabold: '800' as const,  // Raramente usado
    },
    
    // Altura de linha
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64,
  },
  
  borderRadius: {
    none: 0,
    sm: 8,
    md: 12,          // Inputs
    lg: 16,          // Cards
    xl: 20,          // Cards grandes
    '2xl': 24,       // Botões
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  layout: {
    containerPadding: 20,
    screenPadding: 16,
    cardPadding: 16,
    headerHeight: 60,
    tabBarHeight: 60,
    maxWidth: 600,
  },
  
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
} as const;

export type Theme = typeof theme;
