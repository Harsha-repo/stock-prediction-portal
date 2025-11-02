from django.shortcuts import render
from rest_framework.views import APIView
from api.serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status



import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM
from tensorflow.keras.models import load_model
from sklearn.metrics import r2_score, mean_squared_error ,root_mean_squared_error

from django.conf import settings
import os

from .utils import save_plot


# Create your views here.



class StockPrdictionAPIView(APIView):
    
    def post(self, request):
        serializer = StockPredictionSerializer(data = request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            # fetch data from yfinance
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({'error': 'No data for the given ticker found'}, status=status.HTTP_404_NOT_FOUND)
            
            df=df.reset_index()
            print(df.head())
            # generate basic plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(16,8))
            plt.title(f'Close Price History of {ticker}')
            plt.plot(df['Close'])
            plt.legend()
            plt.xlabel('Date', fontsize=18)
            plt.ylabel('Close Price USD ($)', fontsize=18)

            # save the plot to the file
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)


            # 100 days moving average
            ma_100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(16,8))
            plt.title(f'Close Price History of {ticker}')
            plt.plot(ma_100 ,label='100 days moving average' )
            plt.plot(df['Close'] , label= 'closing price history')
            plt.legend()
            plt.xlabel('Date', fontsize=25)
            plt.ylabel('Close Price USD ($)', fontsize=30)
            # save the plot to the file
            plot_img_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)
            
            
            
            # splitting data into trainging and testign

            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])
            
            # scaling down the train set
            
            scaler = MinMaxScaler(feature_range=(0,1))
            
            # load model 
            model = load_model('stock_prediction_model.keras')
            
            # creating test data
            
            past_100days = data_training.tail(100)
            final_df = pd.concat([past_100days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []
            
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
                
            x_test, y_test = np.array(x_test), np.array(y_test)
            
            
            # making prediction
            
            y_predicted = model.predict(x_test)
            
            # revert the scaled prices to original
            
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()
            
            print(y_predicted)
            
            
            # plot final prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(16,8))
            plt.figure(figsize=(12,5))
            plt.plot(y_test,'b',label='original price')
            plt.plot(y_predicted,'r',label='predicted-price')
            plt.legend()
            plt.xlabel('days')
            plt.ylabel('price')
            # save the plot to the file 
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_final_prediction = save_plot(plot_img_path)
            
            
            
            # model evaluation
            
            mse = mean_squared_error(y_test, y_predicted)
            
            rmse = root_mean_squared_error(y_test, y_predicted)
            
            r2 = r2_score(y_test, y_predicted)
            
            
            
                        
            return Response({'status ' : 'success', 
                             'ticker': ticker,
                             'plot_img': plot_img,
                             'plot_100_dma': plot_100_dma,
                             'plot_final_prediction': plot_final_prediction,
                             'mse': mse,
                             'rmse': rmse,
                             'r2': r2
                             
                             })
            