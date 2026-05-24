const voos = [
    {
        id: 1,
        codigo: 'LA408',
        companhia: 'TAAG',
        origem: 'Luanda',
        destino: 'Lisboa',
        hora: '08:30',
        estado: 'No horário',
        gate: 'A1',
        passageiros: 240,
        embarcados: 180,
        atrasoMinutos: 0,
        embarqueStatus: 'A embarcar',
        checkinTempo: 7
    },
    {
        id: 2,
        codigo: 'DT201',
        companhia: 'TAAG',
        origem: 'Luanda',
        destino: 'Joanesburgo',
        hora: '09:10',
        estado: 'Embarque',
        gate: 'B1',
        passageiros: 180,
        embarcados: 87,
        atrasoMinutos: 0,
        embarqueStatus: 'Embarcando',
        checkinTempo: 4
    },
    {
        id: 3,
        codigo: 'TP450',
        companhia: 'TAP',
        origem: 'Luanda',
        destino: 'Paris',
        hora: '11:00',
        estado: 'Programado',
        gate: 'C1',
        passageiros: 210,
        embarcados: 0,
        atrasoMinutos: 0,
        embarqueStatus: '',
        checkinTempo: 5
    }
]

const checkinsHoje = 480
const bagagens = 650
const excessoBagagem = 0
const atendimentos = 3

export {
    voos,
    checkinsHoje,
    bagagens,
    excessoBagagem,
    atendimentos
}