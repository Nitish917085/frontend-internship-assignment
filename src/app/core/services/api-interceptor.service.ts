import {HttpInterceptor,HttpEvent,HttpHandler,HttpRequest,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor  implements HttpInterceptor{
    private cache = new Map<string, HttpResponse<any>>();   

    constructor(){}

    //intercepting only GET http req if it exist in map then return the value from map otherwise calling sendReq fucn 
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(req.method!=='GET') 
            return next.handle(req)
                const cachedRes=this.cache.get(req.url);        
        return cachedRes? of(cachedRes):this.sendReq(req,next);
    }

  //it track respose and if it is object then add is into map
    sendReq(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            tap((event)=>{
                if(event instanceof HttpResponse){
                    this.cache.set(req.url,event)
                }
            })
        )
    }
}
