import * as alt from 'alt-client';
import * as native from 'natives';
import * as GAME_CONTROLS from 'alt:game-controls'
import * as CHARACTER_EDITOR from 'alt:character-editor'
import { LOCATIONS } from '../constants/locations.js';

/**
* Классоподобная функция работы с пользователем  
*@returns
*/
export function createLocalUser() {

    const _player = alt.Player.local;

    /**
    * Данные пользователя  
    * @type {object} data
    */
    const data = {
        cash_money: 0,
        credit_money: 0,
        exp: 0,
        lvl: 0,
        hours_in_game: 0,
        last_position: { x: 0, y: 0, z: 0 },
        username: '',
        first_name: '',
        last_name: '',
        access_token: '',
        refresh_token: ''
    };


    /**
    * Обносить или добавить данные пользователя  
    * @param {object} newData
    */
    const update = (newData) => {
        Object.assign(data, newData);
    };

    /**
    * Получить параметр по значению  
    * @param {string} key
    * @returns {object} data
    */
    const get = (key) => {
        return data[key];
    };

    /**
    * Задать параметр по значению  
    * @param {string} key
    * @param {object} value
    */
    const set = (key, value) => {
        data[key] = value;
    };

    /**
    * Получить все данные пользователя  
    * @return {object} data 
    */
    const getAll = () => {
        return { ...data };
    };

    /**
    * Отключение управления  
    */
    const blockControls = () => {
        GAME_CONTROLS.moveFromToAir('up', 1);
        alt.toggleGameControls(false);
        alt.showCursor(true);
        native.freezeEntityPosition(_player.scriptID, true);
        return;
    };

    /**
    * Включение управления  
    * @param {alt.Vector3} pos 
    */
    const unblockControls = (pos = new alt.Vector3(data.last_position.x, data.last_position.y, data.last_position.z)) => {
        _player.pos = pos;
        GAME_CONTROLS.moveFromToAir('down', 1);
        alt.toggleGameControls(true);
        alt.showCursor(false);
        native.freezeEntityPosition(_player.scriptID, false);
        return;
    };

    /**
    * Загрузка локации  
    * @param {alt.Vector3} pos 
    * @param {string} loc_name 
    */
    const loadDimension = (pos, loc_name) => {
        LOCATIONS[loc_name].forEach(locName => {
            alt.requestIpl(locName);
        });

        const interiorID = native.getInteriorAtCoords(pos.x, pos.y, pos.z);
        if(interiorID) {
            native.refreshInterior(interiorID);
        }
        return;
    };

    /**
    * Создание персонажа  
    * @param {alt.Vector3} pos 
    */
    const createPerson = (pos) => {
        const userPos = new alt.Vector3(-785.1910400390625, 343.0394592285156, 216.8518829345703);
        const userRot = new alt.Vector3(0, 0, -1.533444881439209);
        loadDimension(pos, "apa_v_mp_h_01_b");

        _player.pos = userPos;
        _player.rot = userRot;

        GAME_CONTROLS.moveFromToAir('down', 1);

        const Editor = CHARACTER_EDITOR.Editor;
        Editor.InitEditor();

    }


    return {
        update,
        get,
        set,
        getAll,

        blockControls,
        unblockControls,

        loadDimension,
        createPerson
    };
}
