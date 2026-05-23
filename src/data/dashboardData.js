const voos = [

    {
        id: 1,

        codigo: 'LA408',

        companhia: 'TAAG',

        origem: 'Luanda',

        destino: 'Lisboa',

        hora: '08:30',

        estado: 'Atrasado',

        gate: 'A2',

        passageiros: 240,

        embarcados: 220,

        atrasoMinutos: 60,

        embarqueStatus: 'Última chamada',

        checkinTempo: 7
    },

    {
        id: 2,

        codigo: 'DT201',

        companhia: 'TAAG',

        origem: 'Luanda',

        destino: 'Joanesburgo',

        hora: '09:10',

        estado: 'No horário',

        gate: 'A2',

        passageiros: 180,

        embarcados: 87,

        embarqueStatus: 'Aguardando',

        checkinTempo: 4
    },

    {
        id: 3,

        codigo: 'TP450',

        companhia: 'TAP',

        origem: 'Luanda',

        destino: 'Paris',

        hora: '11:00',

        estado: 'Embarque',

        gate: 'B1',

        passageiros: 210,

        embarcados: 12,

        embarqueStatus: 'Embarcando',

        checkinTempo: 5
    }

]

const checkinsHoje = 480

const bagagens = 650

const excessoBagagem = 10

const atendimentos = 15

export {

    voos,

    checkinsHoje,

    bagagens,

    excessoBagagem,

    atendimentos
}