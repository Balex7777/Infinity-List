// setupTests.ts
global.matchMedia = global.matchMedia || function(query: string) {
	return {
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // для совместимости с устаревшими API
			removeListener: jest.fn(), // для совместимости с устаревшими API
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
	} as MediaQueryList; // явное приведение типа
};
