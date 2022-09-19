"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GetNumberFromWord(spanishWord = 'uno', options = { includeHundreds: true, includeThousands: false }) {
    var _a;
    let spanishNumberWords = {
        cero: 0,
        uno: 1,
        dos: 2,
        tres: 3,
        cuatro: 4,
        cinco: 5,
        seis: 6,
        siete: 7,
        ocho: 8,
        nueve: 9,
        diez: 10,
        once: 11,
        doce: 12,
        trece: 13,
        catorce: 14,
        quince: 15,
        dieciseis: 16,
        diecisiete: 17,
        dieciocho: 18,
        diecinueve: 19
    };
    const dozenWords = [
        'veinti',
        'treinta y ',
        'cuarenta y ',
        'cincuenta y ',
        'sesenta y ',
        'setenta y ',
        'ochenta y ',
        'noventa y '
    ];
    const hundredWords = [
        'ciento',
        'doscientos',
        'trescientos',
        'cuatrocientos',
        'quinientos',
        'seiscientos',
        'setecientos',
        'ochocientos',
        'novecientos'
    ];
    const getDozensAndHundreds = () => {
        const dozensToAppend = [
            { veinte: 20 },
            { treinta: 30 },
            { cuarenta: 40 },
            { cincuenta: 50 },
            { sesenta: 60 },
            { setenta: 70 },
            { ochenta: 80 },
            { noventa: 90 }
        ];
        const hundredsToAppend = [
            { cien: 100 },
            { doscientos: 200 },
            { trescientos: 300 },
            { cuatrocientos: 400 },
            { quinientos: 500 },
            { seiscientos: 600 },
            { setecientos: 700 },
            { ochocientos: 800 },
            { novecientos: 900 }
        ];
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < dozenWords.length; j++) {
                dozensToAppend.push({
                    [dozenWords[j] + Object.keys(spanishNumberWords)[i]]: Number(`${j + 2}${i}`)
                });
            }
        }
        dozensToAppend.sort((a, b) => Number(Object.values(a)[0]) - Number(Object.values(b)[0]));
        if (options.includeHundreds) {
            for (let i = 1; i <= 99; i++) {
                for (let j = 0; j < hundredWords.length; j++) {
                    hundredsToAppend.push({
                        [hundredWords[j] +
                            ' ' +
                            (i >= 20 && i <= 99
                                ? Object.keys(dozensToAppend[i - 20])
                                : Object.keys(spanishNumberWords)[i])]: Number(`${j + 1}${i < 10 ? '0' + i : i}`)
                    });
                }
            }
            hundredsToAppend.sort((a, b) => Number(Object.values(a)[0]) - Number(Object.values(b)[0]));
        }
        return {
            dozens: dozensToAppend,
            hundreds: hundredsToAppend || []
        };
    };
    const { dozens, hundreds } = getDozensAndHundreds();
    const getThousands = (dozens, hundreds) => {
        const thousands = [{ mil: 1000 }];
        for (let i = 1; i < 20; i++) {
            thousands.push({
                [`mil ${spanishNumberWords[i]}`]: i + 1000
            });
        }
        for (let i = 0; i < dozens.length; i++) {
            thousands.push({
                [`mil ${dozens[i][i + 20]}`]: i + 1020
            });
        }
        for (let i = 0; i < hundreds.length; i++) {
            thousands.push({
                [`mil ${hundreds[i][i + 100]}`]: i + 1100
            });
        }
        return thousands;
    };
    spanishNumberWords = {
        ...spanishNumberWords,
        ...dozens.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        ...(options.includeHundreds ? hundreds.reduce((acc, curr) => ({ ...acc, ...curr }), {}) : {}),
        ...(options.includeThousands
            ? (_a = getThousands(dozens, hundreds)) === null || _a === void 0 ? void 0 : _a.reduce((acc, curr) => ({ ...acc, ...curr }), {})
            : {})
    };
    const spanishWordCaptured = spanishWord
        .trim()
        .toLowerCase()
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u');
    return {
        result: spanishNumberWords[spanishWordCaptured] || 'No se encontró el número'
    };
}
exports.default = GetNumberFromWord;
