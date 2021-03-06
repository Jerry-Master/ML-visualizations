# import torch module to NeuralNetwork functionalities #
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
# import pandas to deal with the data #
import pandas as pd
# json module to write a file with the informaition #
import json


# a simple function that takes a list of different dimensional tensors and returns a list of means preserving the 1st dimension
# maybe the name is not the best, please change it like tensorListMean or something like this.
def tensorMean(l):
    result = []
    for t in l:
        result.append(t.mean(0).detach())
    return result

### Class definition fo the parametrized neural network ###
class NeuralNetwork(nn.Module):
    # layers and nNeurons includes the input layer and its size
    def __init__(self, nNeurons):
        super(NeuralNetwork, self).__init__()
        self.nNeurons = nNeurons # list representing the number of neurons per layer

        # weights
        self.W = nn.Sequential()
        for i in range(len(self.nNeurons)-1):
            self.W.add_module("l"+str(i),nn.Linear(nNeurons[i], nNeurons[i+1]))

        # Loss function and optimizer
        self.criterion = nn.MSELoss()
        self.optimizer = optim.SGD(self.parameters(), lr=0.001)

    def forward(self, X):
        x = X
        for i in range(len(self.nNeurons)-1):
            x = F.relu(self.W[i](x))
        return x

    # returns the values of all the activations for each observation in X
    def forward_allsteps(self, X):
        act = [X]
        x = X
        for i in range(len(self.nNeurons)-1):
            x = F.relu(self.W[i](x))
            act.append(x)
        return act

    # returns the mean of the activations when feed with X
    def forward_mean_allsteps(self, X):
        act = self.forward_allsteps(X)
        return tensorMean(act)


    def backward(self, X, y, o):
        # ---
        # Reset gradient
        self.optimizer.zero_grad() 
        loss = self.criterion(o, y)
        loss.backward()
        self.optimizer.step()

    def train(self, X, y):
        # forward + backward pass for training
        out = self.forward(X)
        self.backward(X, y, out)

    def saveWeights(self, model):
        # we will use the PyTorch internal storage functions
        torch.save(model, "NN")
        # you can reload model with all the weights and so forth with:
        # torch.load("NN")

    def predict(self, xPredicted):
        print ("Predicted data based on trained weights: ")
        print ("Input (scaled): \n" + str(xPredicted))
        print ("Output: \n" + str(self.forward(xPredicted)))

# auxiliar function to write the data of the network in a .json file
# filename ?
def write_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file)

def save_as_dict(net, X, y, o=None):
    layers = len(net.nNeurons)
    forward = net.forward_mean_allsteps(X)

    d = {'forward':{}, 'weights':{}}
    for i in range(layers-1):
        d['forward'][i] = forward[i].tolist()
        d['weights'][i] = net.W[i].weight.detach().tolist()
    if o is not None:
        d['forward'][layers-1] = [o]
    return d


# MAIN UTILITY
# Format: filename without .csv (but referring to it)
# arch is a list of the size of each layer, input and output included
# outfile is the complete name with extension .json
# maxEpoch is the number epoch before it stops
# tol is the tolerance admitted
import os
def generate_json(filename, arch, maxEpoch, tol):
    # Number of input and output features
    num_in = arch[0]
    num_out = arch[-1]

    # Read and create valid dataset
    dir_path = os.path.dirname(os.path.realpath(__file__))
    data = pd.read_csv(dir_path + '/' + filename + '.csv')
    X = torch.tensor(data.values[:,0:num_in], dtype = torch.float)
    y = torch.tensor(data.values[:,num_in:num_in+num_out], dtype = torch.float)

    # Create layers of the NN
    network = NeuralNetwork(arch)

    epochDict = {}
    ## Train the network with the data and save all the intermediate steps in a .json
    k = 0
    o = network.forward(X)
    while torch.mean((y-o)**2).detach().item() > tol and k < maxEpoch:
        network.train(X, y)
        o = network.forward(X)
        epochDict[k] = save_as_dict(network, X, y, torch.mean(o).detach().item())
        # print(torch.mean(o).detach().item())
        k += 1
        # print(torch.mean((y-o)**2).detach().item())
    return epochDict

# main function to execute
def main():
    ## read the data from user {
    filename = 'simpledata'
    n = 2 # size of the imput
    m = 1 # size of the output
    # data read: filename, n, m}
    data = pd.read_csv(filename + '.csv')
    X = torch.tensor(data.values[:,0:n], dtype = torch.float)
    y = torch.tensor(data.values[:,n:n+m], dtype = torch.float)

    ## read parameters (#neurons per layer) from user
    # nNeurons = ...
    nNeurons = [n]
    # read the hidden layers
    nNeurons.append(3)
    nNeurons.append(m)
    network = NeuralNetwork(nNeurons)

    epochDict = {}
    ## Train the network with the data and save all the intermediate steps in a .json
    maxEpoch, k = 10000, 0
    o = network.forward(X)
    while torch.mean((y-o)**2).detach().item() > 1e-3 and k < maxEpoch:
        network.train(X, y)
        o = network.forward(X)
        epochDict[k] = save_as_dict(network, X, y)
        k += 1
        print(torch.mean((y-o)**2).detach().item())
    write_json(epochDict, "out.json")

if __name__=='__main__':
    main()
