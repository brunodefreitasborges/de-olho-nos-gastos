import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Congressman, Congressmen } from "../integration/congressmen/congressmen.model";
import { CongressmenService } from "../integration/congressmen/congressmen.service";
import { EMPTY, Observable, catchError, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { LoaderStore } from "./loader.store";


export interface CongressmenState {
    congressmen?: Congressmen[];
    selectedCongressman?: Congressman;
};

const initialState: CongressmenState = {};

@Injectable()
export class CongressmenStore extends ComponentStore<CongressmenState> {

    dataFetched = false;

    constructor(private _service: CongressmenService, private _loaderStore:LoaderStore) {
        super(initialState);
    }

    private readonly setCongressmen = this.updater((state: CongressmenState, congressmen: Congressmen[]) => ({
        ...state,
        congressmen,
    }));

    readonly getCongressmen = this.select((state) => state.congressmen);

    private readonly setSelectedCongressman = this.updater((state: CongressmenState, selectedCongressman: Congressman) => ({
        ...state,
        selectedCongressman,
    }));


    readonly getSelectedCongressman = this.select((state) => state.selectedCongressman);


    readonly fetchCongressmen = this.effect((void$: Observable<void>) => {
        return void$.pipe(
            switchMap(() => this._service.fetchCongressmen().pipe(
                tapResponse((response) => {
                    this.setCongressmen(response);
                    this.dataFetched = true;
                },
                    (error: HttpErrorResponse) => {
                        console.error('Error fetching congressmen');
                        this.dataFetched = false;
                    }),
                catchError(() => EMPTY),
            ))
        );
    });

    readonly fetchCongressmanById = this.effect((id$: Observable<string>) => {
        return id$.pipe(
            tap(() => this._loaderStore.setIsLoadingCongressman(true)),
            switchMap((id) => this._service.fetchCongressman(id).pipe(
                tapResponse((response) => {
                    this.setSelectedCongressman(response);
                    this._loaderStore.setIsLoadingCongressman(false);
                },
                    (error: HttpErrorResponse) => {
                        console.error('Error fetching selected congressman');
                        this._loaderStore.setIsLoadingCongressman(false);
                    }),
                catchError(() => EMPTY),
            ))
        );
    });

    resetSelectedCongressmanState = this.updater((state: CongressmenState) => ({
        ...state,
        selectedCongressman: undefined,
    }));
}